import fs from "fs";
import path from "path";
import { chunkText } from "./chunker.js";
import { createEmbedding } from "./embeddings.js";
import { addDocument } from "./store.js";

export async function indexDocuments() {

    const filePath = path.join(
        import.meta.dirname,
        "documents",
        "company-policy.txt"
    );

    const text = fs.readFileSync(filePath, "utf-8");

    const chunks = chunkText(text);

    for (const chunk of chunks) {

        const embedding = await createEmbedding(chunk);

        addDocument(chunk, embedding);
    }

    console.log(
        `Indexed ${chunks.length} document chunks`
    );
}