import { createContext, useState } from "react";

export const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
    const [output, setOutput] = useState("");

    return (
        <EmailContext.Provider value={{ output, setOutput }}>
            {children}
        </EmailContext.Provider>
    );
};