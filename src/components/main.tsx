import React, { useState } from "react";
// import Input from "./input";
import BrightEthereumDeepLinkQR from "./qrGenerator";
import { Button, Form, Input } from 'reactstrap';

const Main = () => {
    const [input, updateInput] = useState("");
    const [showQR, toggleShowQR] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateInput(e.target.value);
    };

    const resetState = () => {
        updateInput("");
        toggleShowQR(false);
    }

    return (
        <Form>
            <div className="main-form">
                {
                    !showQR &&
                    <Input onInput={handleChange} id="ethereumAddress" spellCheck={false} autocomplete="off" className="main-input" placeholder="Enter your Ethereum address" />
                }
                {
                    showQR &&
                    <BrightEthereumDeepLinkQR ethAddress={input} />
                }
                {
                    !showQR &&
                    <Button onClick={() => toggleShowQR(!showQR)} size="lg" color="neutral" type="button" disabled={!input}>
                        Submit
                    </Button>
                }
                {
                    showQR &&
                    <Button onClick={resetState} size="lg" color="neutral" type="button">
                        Back
                    </Button>
                }
            </div>
        </Form>
    );
};

export default Main;
