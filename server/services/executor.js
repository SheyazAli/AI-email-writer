import gemini from "../config/gemini.js";
import dotenv from "dotenv";
dotenv.config();

import { getWeather } from "../tools/weather.js";

const tools = [
    {
        functionDeclarations: [
            {
                name: "get_weather",
                description: "Get the current weather for a city.",
                parameters: {
                    type: "object",
                    properties: {
                        location: {
                            type: "string",
                            description: "The city or location to get the weather for."
                        }
                    },
                    required: ["location"]
                }
            }
        ]
    }
];

export async function Emailexecutor(instruction) {

    const Executorresponse = await gemini.interactions.create({

        model: process.env.GEMINI_MODEL,

        input: `
            You are the Executor of Zoe, an AI email assistant.

            Follow the instruction below and produce ONLY the final email.

            Instruction:
            ${instruction}

            Use the get_weather tool whenever current weather
            information is required.

            If the instruction contains validator feedback,
            improve the email according to that feedback.

            Do not explain your process.
            Do not mention the validator.
            Return only the final email.
        `,

        tools: tools
    });

    // Check whether Gemini requested a tool
    const toolCalls = Executorresponse.steps.filter(
        step => step.type === "function_call"
    );

    // If no tool is required, return the generated email
    if (toolCalls.length === 0) {

        console.log("Executor:", Executorresponse.output_text);

        return Executorresponse.output_text;
    }

    // Execute requested tools
    const toolResults = [];

    for (const toolCall of toolCalls) {

        if (toolCall.name === "get_weather") {

            const { location } = JSON.parse(toolCall.arguments);

            const weather = await getWeather(location);

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

    // Send the tool result back to Gemini
    const finalResponse = await gemini.interactions.create({

        model: process.env.GEMINI_MODEL,

        previous_interaction_id: Executorresponse.id,

        tools: tools,

        input: toolResults
    });

    console.log("Executor:", finalResponse.output_text);

    return finalResponse.output_text;
}