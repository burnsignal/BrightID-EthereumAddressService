import React, { useState, useEffect } from "react";
import BrightEthereumDeepLinkQR from "./qrGenerator";
import { Button, Form, Input, Modal, ModalBody, Container, InputGroup, InputGroupAddon } from 'reactstrap';
import { assignEthereum } from '../util/utilJS'
import MetaMask from '../assets/img/MetaMask.svg'
import Web3 from 'web3';

const Main = () => {
    const [input, updateInput] = useState("");
    const [showQR, toggleShowQR] = useState(false);
    const [validAddress, isValid] = useState(false)
    const [ethereum] = useState(() => assignEthereum());

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateInput(e.target.value)
    };

    useEffect(() => {
        isValid(Web3.utils.isAddress(input));
    })

    const resetState = () => {
        updateInput("");
        toggleShowQR(false);
    }

    const enableEthereum = async () => {
        const result = await ethereum.enable()
        updateInput(result[0])
    }

    return (
        <Form>
            <div className="main-form">
                <InputGroup>
                    <Input
                        onChange={handleChange}
                        id="ethereumAddress"
                        spellCheck={false}
                        autoComplete="off"
                        className="main-input"
                        placeholder="Enter your Ethereum address"
                        value={input}
                    />
                    <InputGroupAddon addonType="append">
                        <Button
                            className="inlineButton"
                            onClick={() => enableEthereum()}
                            color="neutral"
                            type="button"
                            disabled={!ethereum}
                        >
                            <img src={MetaMask} />
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
                <Button
                    onClick={() => toggleShowQR(!showQR)}
                    size="lg"
                    color="neutral"
                    type="button"
                    disabled={!input || !validAddress}
                >
                    Submit
                </Button>
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
