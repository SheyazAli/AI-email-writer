import gemini from "../config/gemini.js";
import { getWeather } from "../tools/weather.js";

const tools = [
    {
        type: "function",
        name: "get_weather",
        description: "Get the current weather for a city.",
        parameters: {
            type: "object",
            properties: {
                city: {
                    type: "string",
                    description: "The city to get weather for"
                }
            },
            required: ["city"]
        }
    }
];

export async function Emailexecutor(Plannerresponse) {

    const Executorresponce = await gemini.interactions.create({
        model: "gemini-3.5-flash-lite",

        input: `
            Here is the plan created by the Planner:

            ${Plannerresponse}

            Execute this plan and produce the final email.

            Use the get_weather tool whenever weather
            information is required.
        `,

        tools: tools
    });

    const toolCalls = Executorresponce.steps.filter(
        step => step.type === "function_call"
    );

    if (toolCalls.length === 0) {
        return Executorresponce.output_text;
    }

    const toolResults = [];

    for (const toolCall of toolCalls) {

        if (toolCall.name === "get_weather") {

            const { city } = toolCall.arguments;

            const weather = await getWeather(city);

            toolResults.push({
                type: "function_result",
                name: toolCall.name,
                call_id: toolCall.id,
                result: [
                    {
                        type: "text",
                        text: JSON.stringify(weather)
                    }
                ]
            });
        }
    }

    const finalResponse = await gemini.interactions.create({

        model: "gemini-3.7-flash",

        previous_interaction_id: Executorresponce.id,

        tools: tools,

        input: toolResults
    });

    return finalResponse.output_text;
}