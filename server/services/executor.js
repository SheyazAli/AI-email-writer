import gemini from "../config/gemini.js";

export async function Emailexecutor(Plannerresponse) {

    const Executorresponce = await gemini.interactions.create({
        model: "gemini-3.7-flash",

        input: `
            Here is the plan created by the Planner:

            ${Plannerresponse}

            Execute this plan and produce the final email.
        `
    });

    console.log(Executorresponce.output_text)

    return Executorresponce.output_text;
}