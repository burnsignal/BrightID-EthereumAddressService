import React, { useState, useEffect } from "react";
import BrightEthereumDeepLinkQR from "./qrGenerator";
import { Button, Form, Input, Modal, ModalBody, Container, InputGroup, InputGroupAddon, FormFeedback } from 'reactstrap';
import { assignEthereum } from '../util/metamask'
import { convertENS } from '../util/ens'
import MetaMask from '../assets/img/MetaMask.svg'
import Web3 from 'web3';
import { mobileCheck, androidOrIphoneLink } from "util/detectMobile";
import { deepLinkPrefix } from "util/deepLink";

const Main = () => {
    const [input, updateInput] = useState('');
    const [address, updateAddress] = useState('');
    const [showQR, toggleShowQR] = useState(false);
    const [notSupported, toggleNotSupported] = useState(false);
    const [invalidError, setInvalidError] = useState(false);
    const [validAddress, isValid] = useState(true);
    const [isMobile] = useState(mobileCheck())
    const [ethereum] = useState(() => assignEthereum());
    const [brightIdStoreLink] = useState(androidOrIphoneLink());

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        updateInput(e.target.value)
    };

    useEffect(() => {
        if (input.includes('.eth')) {
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

    const submitAddress = () => {
        if(validAddress && !isMobile) toggleShowQR(true);
        else if (validAddress && isMobile) openAppOrAppStore();
        else setInvalidError(true)
      }

    const resetState = () => {
        updateInput("");
        toggleShowQR(false);
        toggleNotSupported(false);
    }

    const enableEthereum = async () => {
        const result = await ethereum.enable()
        updateInput(result[0])
    }

    const openAppOrAppStore = () => {
        if (brightIdStoreLink === '') {
            toggleNotSupported(true);
            return;
        }
        setTimeout(() => { window.location.assign(brightIdStoreLink) }, 250);
        window.location.assign(deepLinkPrefix + `${input}`)
    }

    return (
        <Form>
            <div className="main-form">
                <InputGroup style={{paddingBottom: invalidError  ? 0 : 20}}>
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
                    <InputGroupAddon addonType="append" >
                        <Button
                            className="inlineButton"
                            onClick={() => enableEthereum()}
                            color="neutral"
                            type="button"
                            disabled={!ethereum}
                        >
                            <img src={MetaMask} alt="Connect with Metamask" />
                        </Button>
                    </InputGroupAddon>
                    <FormFeedback id="invalidAddress">
                      Looks like this wallet address is invalid
                    </FormFeedback>
                </InputGroup>
                {
                    isMobile ?
                        (
                            // getLink(androidOrIphoneLink()),
                            <Button
                                onClick={submitAddress}
                                size="lg"
                                color="neutral"
                                type="button"
                                disabled={!input}
                            >
                                Link BrightID
                        </Button>
                        )
                        :
                        <Button
                            onClick={submitAddress}
                            size="lg"
                            color="neutral"
                            type="button"
                            disabled={!input}
                        >
                            Submit
                        </Button>
                }
                {
                    showQR &&
                    <div>
                        <Modal onExit={resetState} className="DefaultModal" isOpen={showQR} toggle={() => toggleShowQR(false)}>
                            <Container>
                                <div className="DefaultModal-content">
                                    <ModalBody>
                                        <div className="DefaultModal-content">
                                            <p>Scan the QR code to connect your Ethereum address with your BrightID account</p>
                                            <BrightEthereumDeepLinkQR ethAddress={address} />
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
    );
};

export default Main;
