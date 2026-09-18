import gemini from "../config/gemini.js";

export async function createEmbedding(text) {

    const response = await gemini.models.embedContent({
        model: process.env.GEMINI_EMBEDDING_MODEL,

        contents: text
    });

    return response.embeddings[0].values;
}