import { createContext, useState } from "react";

export const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
    const [output, setOutput] = useState("");
    const [prompt, setPrompt] = useState("");

    return (
        <EmailContext.Provider value={{ output, setOutput, prompt, setPrompt }}>
            {children}
        </EmailContext.Provider>
    );
};