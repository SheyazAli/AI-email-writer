import express from "express";
import cors from "cors";

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



app.post("/api/generate", async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await openai.responses.create({
            model: "gpt-5.4-mini",
            instructions: "You are a professional email writing assistant.",
            input: prompt
        });

        res.json({
            output: response.output_text
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