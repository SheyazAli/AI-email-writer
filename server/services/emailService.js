import { Emailplanner } from "./planner.js";
import { Emailexecutor } from "./executor.js"

export async function generateEmail(messages) {

    const planner = await Emailplanner(messages);

    const executor = await Emailexecutor(planner)

    return executor;
}

// import openai from "../config/openai.js";
// import { getWeather } from "../tools/weather.js";
// import { Emailplanner } from "./planner.js";

// const tools = [
//     {
//         type: "function",
//         name: "get_weather",
//         description: "Get the current weather for a city.",
//         strict: true,
//         parameters: {
//             type: "object",
//             properties: {
//                 city: {
//                     type: "string",
//                     description: "The city to get weather for"
//                 }
//             },
//             required: ["city"],
//             additionalProperties: false
//         }
//     }
// ];

// export async function generateEmail(messages) {

//     const response = await openai.responses.create({
//         model: "gpt-5.4-mini",

//         instructions: `
//             You are Zoe, a professional email writing assistant.

//             Use the get_weather tool whenever the user asks
//             for weather information.

//             Write emails using clear and professional English.
//             Keep emails concise.
//             Include an appropriate greeting and closing.
//             Do not invent unnecessary details.

//             If the user asks for something other than writing
//             or helping with an email, politely explain that you
//             can only help with writing emails.
//         `,

//         input: messages,
//         tools: tools
//     });

//     const planner = Emailplanner(messages)

//     const toolCalls = response.output.filter(
//         item => item.type === "function_call"
//     );

//     if (toolCalls.length === 0) {
//         return response.output_text;
//     }

//     const toolOutputs = [];

//     for (const toolCall of toolCalls) {

//         if (toolCall.name === "get_weather") {

//             const { city } = JSON.parse(toolCall.arguments);

//             const weather = await getWeather(city);

//             toolOutputs.push({
//                 type: "function_call_output",
//                 call_id: toolCall.call_id,
//                 output: JSON.stringify(weather)
//             });
//         }
//     }

//     const finalResponse = await openai.responses.create({
//         model: "gpt-5.4-mini",
//         previous_response_id: response.id,
//         input: toolOutputs
//     });

//     return finalResponse.output_text;
// }

