export function validateEmail(output) {
    if (!output) {
        return false;
    }

    if (!output.includes("Subject:")) {
        return false;
    }

    return true;
}