import React, { useState } from "react";
// import Input from "./input";
import BrightEthereumDeepLinkQR from "./qrGenerator";
import { Button, Form, Input, Modal, ModalBody, Container } from 'reactstrap';

const Main = () => {
    // const [modal1, setModal1] = React.useState(false);
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
                    !showQR &&
                    <Button onClick={() => toggleShowQR(!showQR)} size="lg" color="neutral" type="button" disabled={!input}>
                        Submit
                    </Button>
                }
                {
                    showQR &&
                    <div>
                        <Modal onExit={resetState} className="QR-modal" isOpen={showQR} toggle={() => toggleShowQR(false)}>
                            <Container>
                                <div className="QR-modal-content">
                                    <ModalBody>
                                        <div className="QR-modal-content">
                                            <p>Scan the QR code to connect your Ethereum address with your BrightID account</p>
                                            <BrightEthereumDeepLinkQR ethAddress={input} />
                                        </div>
                                    </ModalBody>
                                    <div className="modal-footer">
                                        <Button
                                            size="lg"
                                            color="warning"
                                            type="button"
                                            onClick={resetState}
                                        >
                                            Close
                                </Button>
                                    </div>
                                </div>
                            </Container>
                        </Modal>
                    </div>
                }
            </div>
        </Form>
    );
};

export default Main;
