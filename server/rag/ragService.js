import { retrieve } from "./retriever.js";
import { generateAnswer } from "./generator.js";

async function ragServices(question) {

    const results = await retrieve(question);

    const context = results.map(r => r.text).join("\n\n");

    const answer = await generateAnswer(question, context);

    return answer;

}

export default ragServices;