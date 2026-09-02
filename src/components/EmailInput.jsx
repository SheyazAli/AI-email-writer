import React, { useState, useContext } from "react";
import { EmailContext } from "../Context/EmailContext";

const EmailInput = () => {
    const { messages, setMessages, prompt, setPrompt } = useContext(EmailContext);

    const [isLoading, setIsLoading] = useState(false);


    const handleGenerate = async () => {
        setIsLoading(true);

        const userMessage = {
            role: "user",
            content: prompt //Create the user's message
        };

        const updatedMessages = [...messages, userMessage]; //This is how Zoe remembers the conversation

        const response = await fetch("http://localhost:5000/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages: updatedMessages
            })
        });

        const data = await response.json();

        const aiMessage = {
            role: "assistant",
            content: data.output
        };

        setMessages([...updatedMessages, aiMessage]); //save convo

        setPrompt("");

        setIsLoading(false);
    };

    return (
        <div className="email-input">

            {!prompt && (
                <>
                    <h4 className="header">
                        What do you want to write?
                    </h4>

                    <p className="sub-header">
                        Hi, I am ZOE. How can I help you today?
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
                    disabled={isLoading}
                >
                    {isLoading ? "Generating..." : "Generate"}
                </button>

            </div>

        </div>
    );
};

export default EmailInput;