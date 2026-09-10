import gemini from "../config/gemini.js";
import dotenv from "dotenv";
dotenv.config();

export async function Emailexecutor(instruction) {

    const Executorresponse = await gemini.interactions.create({
        model: process.env.GEMINI_MODEL,

        input: `
            You are the Executor of Zoe, an AI email assistant.

            Follow the instruction below and produce ONLY the final email.

            Instruction:
            ${instruction}

            If the instruction contains validator feedback,
            improve the email according to that feedback.

            Do not explain your process.
            Do not mention the validator.
            Return only the final email.
        `
    });

    console.log("Executor:", Executorresponse.output_text);

    return Executorresponse.output_text;
}