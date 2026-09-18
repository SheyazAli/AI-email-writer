import gemini from "../config/gemini.js";

export async function generateAnswer(question, context) {

    const response = await gemini.interactions.create({
        model: process.env.GEMINI_MODEL,

        input: `
            You are Zoe's knowledge assistant.

            Answer the user's question using the provided context.

            Context:
            ${context}

            Question:
            ${question}

            Rules:
            - Use the provided context.
            - Do not invent information.
            - If the answer is not available in the context, say:
              "I don't have enough information to answer that."
        `
    });

    return response.output_text;
}