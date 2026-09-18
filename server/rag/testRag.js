import { indexDocuments } from "./indexDocuments.js";
import { retrieve } from "./retriever.js";
import { generateAnswer } from "./generator.js";

async function testRAG() {

    await indexDocuments();

    const question = "How many annual leave days do employees get?"

    const results = await retrieve(question);

    console.log("\nRetrieved information:\n");

    results.forEach((result, index) => {

        console.log(
            `${index + 1}. Score: ${result.similarity}`
        );

        console.log(result.text);
        console.log("----------------------");
    });

    const context = results.map(r => r.text).join("\n\n")


    const answer = await generateAnswer(question, context)

    console.log("\nZoe's Answer:\n");
    console.log(answer);
}

testRAG();