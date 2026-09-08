import { Emailplanner } from "./planner.js";
import { Emailexecutor } from "./executor.js"

export async function generateEmail(messages) {

    const planner = await Emailplanner(messages);

    const executor = await Emailexecutor(planner)

    return executor;
}



