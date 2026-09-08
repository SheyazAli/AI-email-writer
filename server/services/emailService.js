import { Emailplanner } from "./planner.js";
import { Emailexecutor } from "./executor.js"
import { Emailvalidator } from "./validator.js"

export async function generateEmail(messages) {

    const planner = await Emailplanner(messages);

    if (planner.startsWith("OFF_TOPIC:")) {
        return planner.replace("OFF_TOPIC:", "").trim();
    }

    const executor = await Emailexecutor(planner)

    const validator = await Emailvalidator(executor)

    return validator;
}
