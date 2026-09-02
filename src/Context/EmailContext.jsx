import { createContext, useState } from "react";

export const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState("");

    return (
        <EmailContext.Provider
            value={{
                messages,
                setMessages,
                prompt,
                setPrompt
            }}
        >
            {children}
        </EmailContext.Provider>
    );
};