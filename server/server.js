import express from "express";
import cors from "cors";
import { generateEmail } from "./services/emailService.js";

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/api/generate", async (req, res) => {
    try {
        const { messages } = req.body;

        const output = await generateEmail(messages);

        res.json({
            output: output
        });

    } catch (error) {
        console.error(error);
        const status = error.status === 429 ? 429 : 500;
        const message = error.status === 429
            ? "Rate limit exceeded. Please wait a moment before trying again."
            : "Failed to generate email";
        res.status(status).json({ error: message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});