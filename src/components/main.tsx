import React, { useState } from "react";
// import Input from "./input";
import BrightEthereumDeepLinkQR from "./qrGenerator";
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';

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
                <Label for="ethereumAddress">Enter your Ethereum address</Label>
                <Input id="ethereumAddress" spellCheck={false} autocomplete="off" className="main-input" placeholder=" " />
                <Button size="lg" color="neutral" type="button">
                    Submit
              </Button>
            </div>
        </Form>
        // <div>
        //     {
        //         !showQR && <Input handleChange={handleChange} />
        //     }
        //     {
        //         showQR && <BrightEthereumDeepLinkQR ethAddress={input} />
        //     }
        //     {
        //         !showQR &&
        //         <button onClick={() => toggleShowQR(!showQR)} disabled={!input}>
        //             Link BrightID
        // </button>
        //     }
        //     {
        //         showQR &&
        //         <button onClick={resetState}>
        //             Back
        // </button>
        //     }
        // </div>
    );
};

export default Main;
