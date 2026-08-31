import React, { useState } from "react";
import "./Home.css";
import EmailInput from "../components/EmailInput";
import EmailOutput from "../components/EmailOutput";

const Home = () => {
    const [output, setOutput] = useState("");

    return (
        <div className="home">

            <header>
                <h1 className="main-header">AI Email Writer</h1>
            </header>

            <main>

                <EmailInput />
                <EmailOutput />

            </main>

        </div>
    );
};

export default Home;