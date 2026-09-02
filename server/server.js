import express from "express";
import cors from "cors";
import { getWeather } from "./tools/weather.js";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const PORT = 5000;

app.use(cors());
app.use(express.json());

const tools = [
    {
        type: "function",
        name: "get_weather",
        description: "Get the current weather for a city.",
        strict: true,
        parameters: {
            type: "object",
            properties: {
                city: {
                    type: "string",
                    description: "The city to get weather for"
                }
            },
            required: ["city"],
            additionalProperties: false
        }
    }
];

app.post("/api/generate", async (req, res) => {
    try {
        const { messages } = req.body; //Get messages from React

        // Ask Zoe what to do
        const response = await openai.responses.create({
            model: "gpt-5.4-mini",

            instructions: `
                You are Zoe, a professional email writing assistant.

                Use the get_weather tool whenever the user asks
                for weather information.

                Write emails using clear and professional English.
                Keep emails concise.
                Include an appropriate greeting and closing.
                Do not invent unnecessary details.
                if user ask you to write anythng than email replay i can only help you with writing email
            `,

            input: messages,
            tools: tools
        });
        // console.log(response.output)

        // Check whether Zoe requested a tool
        const toolCalls = response.output.filter(
            item => item.type === "function_call"
        );

        // No tool needed
        if (toolCalls.length === 0) {
            return res.json({
                output: response.output_text
            });
        }

        // Execute the requested tools
        const toolOutputs = [];

        for (const toolCall of toolCalls) {

            if (toolCall.name === "get_weather") {

                const { city } = JSON.parse(toolCall.arguments);

                // console.log("Weather requested for:", city);

                const weather = await getWeather(city);

                toolOutputs.push({
                    type: "function_call_output",
                    call_id: toolCall.call_id,
                    output: JSON.stringify(weather)
                });
            }
        }

        // Give the tool result back to Zoe
        const finalResponse = await openai.responses.create({
            model: "gpt-5.4-mini",

            previous_response_id: response.id,

            input: toolOutputs
        });

        // Return Zoe's final answer
        res.json({
            output: finalResponse.output_text
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to generate email"
        });
    }
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});