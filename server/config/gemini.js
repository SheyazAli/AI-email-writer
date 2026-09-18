import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(import.meta.dirname, "../.env") });

const gemini = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export default gemini;