import React, { useState, useEffect } from "react";
import { Button, Input, FormFeedback, Modal, Container, ModalBody, Form } from 'reactstrap';
import Web3 from 'web3';
import { convertENS } from '../util/ens'
import { androidOrIphoneLink } from "util/detectMobile";
import { deepLinkPrefix } from "util/deepLink";

export const MobileFlow = () => {
    const [input, updateInput] = useState('');
    const [invalidError, setInvalidError] = useState(false);
    const [validAddress, isValid] = useState(true);
    const [address, updateAddress] = useState('');
    const [showQR, toggleShowQR] = useState(false);
    const [brightIdStoreLink] = useState(androidOrIphoneLink());
    const [notSupported, toggleNotSupported] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateInput(e.target.value)
    };


    useEffect(() => {
        if (input && input.includes('.eth')) {
            async function resolveENS() {
                validateAndUpdateAddress(await convertENS(input))
            }
            resolveENS();
         } else validateAndUpdateAddress(input);
         setInvalidError(false)
    }, [input])

    const validateAndUpdateAddress = (input: string) => {
        if ( Web3.utils.isAddress(input) ) {
            isValid(true);
            updateAddress(input);
        } else {
            isValid(false);
        }
    }

    const submitAddress = (e: React.FormEvent) => {
        e.preventDefault();
        if (validAddress) toggleShowQR(true);
        else setInvalidError(true)
    }

    const openAppOrAppStore = () => {
        if (brightIdStoreLink === '') {
            toggleNotSupported(true);
            return;
        }
        setTimeout(() => { window.location.assign(brightIdStoreLink) }, 1000);
        window.location.assign(deepLinkPrefix + `${address}`)
    }

    const resetState = () => {
        updateInput("");
        toggleShowQR(false);
        toggleNotSupported(false);
    }

    return (
        <Form>
            <div className="main-form">
                <Input
                        onChange={handleChange}
                        id="ethereumAddress"
                        spellCheck={false}
                        autoComplete="off"
                        className="main-input"
                        placeholder="Enter your Ethereum address or ENS Domain"
                        value={input}
                        invalid={invalidError}
                    />
                    <FormFeedback id="invalidAddress">
                        Looks like this wallet address is invalid
                    </FormFeedback>
                <Button
                    onClick={submitAddress}
                    size="lg"
                    color="neutral"
                    type="submit"
                    disabled={!validAddress}
                >
                    Submit
                </Button>
                {
                    showQR &&
                    <div>
                        <Modal onExit={resetState} className="DefaultModal" isOpen={showQR} toggle={() => toggleShowQR(false)}>
                            <Container>
                                <div className="DefaultModal-content">
                                    <ModalBody>
                                        <div className="DefaultModal-content">
                                            <div style={{textAlign: 'left'}}>
                                                <ol>
                                                    <li style={{marginBottom: '10px'}}>
                                                        Please send an empty 0 value transaction to <strong>brightid.burnsignal.eth</strong> from
                                                            <p style={{
                                                                fontSize: '9px',
                                                                fontWeight: 'bold',
                                                                marginBottom: '0px'
                                                                }}>
                                                            {address}
                                                        </p>
                                                        to register with the BrightID contract
                                                    </li>
                                                    <li>
                                                        Click <strong>Link BrightID</strong> to link this address to your BrightID account with the BrightID mobile app
                                                    </li>
                                                </ol>                                             
                                            </div>
                                        </div>
                                    </ModalBody>
                                    <div className="modal-footer">
                                        <Button
                                            onClick={() => openAppOrAppStore()}
                                            size="lg"
                                            color="primary"
                                            type="button"
                                        >
                                            Link BrightID
                                        </Button>
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
                {
                    notSupported &&
                    <div>
                        <Modal onExit={resetState} className="DefaultModal" isOpen={notSupported} toggle={() => toggleNotSupported(false)}>
                            <Container>
                                <div className="DefaultModal-content">
                                    <ModalBody>
                                        <div className="DefaultModal-content">
                                            <p>Unfortunately, the BrightID app is not available for your mobile operating system.</p>
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
    )
}