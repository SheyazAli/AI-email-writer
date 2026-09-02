import React, { useContext } from "react";
import { EmailContext } from "../Context/EmailContext";

const EmailOutput = () => {

    const { messages, setMessages, setPrompt } = useContext(EmailContext);

    const handleGenerateNew = () => {
        setMessages([]);
        setPrompt("");
    };

    if (messages.length === 0) {
        return null;
    }

    return (
        <div className="output-area">

            <h2>Conversation</h2>

                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`chat-message ${
                            message.role === "user" ? "user-message" : "ai-message"
                        }`}
                    >
                        <div className="message-name">
                            {message.role === "user" ? "You" : "Zoe"}
                        </div>

                        <div className="message-content">
                            {message.content}
                        </div>
                    </div>
                ))}

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