import { Emailplanner } from "./planner.js";
import { Emailexecutor } from "./executor.js";
import { Emailvalidator } from "./validator.js";
import ragServices from "../rag/ragService.js";

export async function generateEmail(messages) {

    const planner = await Emailplanner(messages);

    if (planner.startsWith("OFF_TOPIC:")) {
        return planner.replace("OFF_TOPIC:", "").trim();
    }

    const userQuestion = messages
    .filter(message => message.role === "user")
    .at(-1).content;

    if (planner.includes("NEEDS_RAG: true")) {

        const ragResult = await ragServices(userQuestion);

        const executorInstruction = `
            Plan:
            ${planner}

            Relevant company information:
            ${ragResult}

            Use the company information above when writing the email.
            Do not add information that is not provided.
        `;

        const executor = await Emailexecutor(executorInstruction);

        const validator = await Emailvalidator(executor);

        if (validator.startsWith("REQUIRED_CHANGES:")) {

            const improvedEmail = await Emailexecutor(`
                Original email:
                ${executor}

                Validator feedback:
                ${validator}

                Improve the original email according to the validator feedback.
            `);

            return improvedEmail;
        }

        return executor;
    }

    const executor = await Emailexecutor(planner);

    const validator = await Emailvalidator(executor);


    if (validator.startsWith("REQUIRED_CHANGES:")) {

        const improvedEmail = await Emailexecutor(`
            Original email:
            ${executor}

            Validator feedback:
            ${validator}

            Improve the original email according to the validator feedback.
        `);

        return improvedEmail;
    }

    return executor;
}