import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { EmailProvider } from "./Context/EmailContext";

const App = () => {
    return (
        <BrowserRouter>
        <EmailProvider>
            <Routes>
                    <Route path="/" element={<Home />} />
            </Routes>
            </EmailProvider>
        </BrowserRouter>
    );
};

export default App;