import gemini from "../config/gemini.js";

export async function Emailplanner(messages) {

    const conversation = messages
        .map(message => `${message.role}: ${message.content}`)
        .join("\n");

    const Plannerresponse = await gemini.interactions.create({
        model: "gemini-3.7-flash",

        input: `
            You are the planning component of Zoe.

            Analyze the user's request and create a plan
            for completing the task.

            Do not write the final email.
            Only create the plan.

            Conversation:
            ${conversation}
        `
    });

    console.log(Plannerresponse.output_text);

    return Plannerresponse.output_text;
}