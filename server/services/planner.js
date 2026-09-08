import gemini from "../config/gemini.js";

export async function Emailplanner(messages) {

    const conversation = messages
        .map(message => `${message.role}: ${message.content}`)
        .join("\n");

    const Plannerresponse = await gemini.interactions.create({
        model: "gemini-3.5-flash-lite",

        input: `
            You are the planning component of Zoe.
            IF IT IS NOT related to an email 
            (e.g., asking for general coding, trivia, general chat, math, etc.):
            Respond ONLY with:
               "OFF_TOPIC: Hi! I'm Zoe, your email assistant. 
               I can only assist with writing, editing, 
               or managing emails. How can I help you with an email today?"

            Analyze the user's request and create a plan
            for completing the task.

            Do not write the final email.
            Only create the plan.

            Conversation:
            ${conversation}
        `
    });

    const responseText = Plannerresponse.output_text.trim();

    if (responseText.startsWith("OFF_TOPIC:")) {
        return responseText;
    }

    console.log(responseText);

    return responseText;
}