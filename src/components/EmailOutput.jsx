import React, { useContext } from "react";
import { EmailContext } from "../Context/EmailContext";

const EmailOutput = () => {

    const { output, setOutput, setPrompt } = useContext(EmailContext);

    const handleGenerateNew = () => {
        setOutput("");
        setPrompt("")
    };

    if (!output) {
        return null;
    }

    return (
        <div className="output-area">

            <h2>Generated Email</h2>

            <p>{output}</p>

            <button
                className="generate-new-button"
                onClick={handleGenerateNew}
            >
                ✨ Generate New
            </button>

        </div>
    );
};

export default EmailOutput;