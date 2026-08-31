import React, { useState, useContext } from "react";
import { EmailContext } from "../Context/EmailContext";

const EmailInput = () => {
    const { setOutput } = useContext(EmailContext);

    const [prompt, setPrompt] = useState("");

const handleGenerate = async () => {
    console.log(prompt);

    const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: prompt
        })
    });

    const data = await response.json();

    console.log(data);
    
    setOutput(data.output);
};

    return (
        <div className="email-input">

            {!prompt && (
                <>
                    <h4 className="header">
                        What do you want to write?
                    </h4>

                    <p className="sub-header">
                        Let AI help you write the perfect email.
                    </p>
                </>
            )}

            <div className="input-wrapper">

                <button className="add-button">+</button>

                <textarea
                    className="input-box"
                    placeholder="Ask AI to write an email..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />

                <button
                    className="generate-button"
                    onClick={handleGenerate}
                >
                    Generate
                </button>

            </div>

        </div>
    );
};

export default EmailInput;