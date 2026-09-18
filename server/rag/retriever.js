import { createEmbedding } from "./embeddings.js";
import { getDocuments } from "./store.js";

function cosineSimilarity(a, b) {

    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (let i = 0; i < a.length; i++) {

        dotProduct += a[i] * b[i];

        magnitudeA += a[i] * a[i];

        magnitudeB += b[i] * b[i];
    }

    return dotProduct /
        (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}


export async function retrieve(query, topK = 2) {

    const queryEmbedding = await createEmbedding(query);

    const documents = getDocuments();

    const results = documents.map(document => {

        const similarity = cosineSimilarity(
            queryEmbedding,
            document.embedding
        );

        return {
            text: document.text,
            similarity
        };
    });

    results.sort(
        (a, b) => b.similarity - a.similarity
    );

    return results.slice(0, topK);
}