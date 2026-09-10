import gemini from "../config/gemini.js";
import dotenv from "dotenv";
dotenv.config();

export async function Emailvalidator(Executorresponse) {

    const validatorresponse = await gemini.interactions.create({
        model: process.env.GEMINI_MODEL,

        input: `
            Here is the email created by the Executor:

            ${Executorresponse}

            Check the email for:
            - Grammar
            - Professional tone
            - Clarity
            - Completeness
            - Whether it follows the user's request

            If improvements are required, respond exactly in this format:

            REQUIRED_CHANGES:
            <explain what needs to be changed>

            If the email is already good, respond exactly:

            APPROVED
        `
    });

    const responseText = validatorresponse.output_text.trim();

    console.log("Validator:", responseText);

    return responseText;
}