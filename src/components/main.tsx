import React, { useState, useEffect } from "react";
import BrightEthereumDeepLinkQR from "./qrGenerator";
import { Button, Form, Input, Modal, ModalBody, Container, FormFeedback } from 'reactstrap';
import { assignEthereum } from '../util/metamask'
import { convertENS } from '../util/ens'
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { mobileCheck, androidOrIphoneLink } from "util/detectMobile";
import { getWeb3 } from "util/web3";
import { deepLinkPrefix } from "util/deepLink";
import { SPONSOR_CONTRACT_ABI, SPONSOR_CONTRACT_ADDRESS } from "util/constants";
import { getAuthenticated, checkAuthenticated } from "util/brightID"
import web3logo from '../assets/img/web3js.jpg'
import manualInput from '../assets/img/manual-input.png'

const Main = () => {
    const [address, updateAddress] = useState('');
    const [accounts, setAccounts] = useState<string[]>([]);
    const [contractInstance, setInstance] = useState<Contract>()
    const [input, updateInput] = useState(accounts[0]);
    const [showQR, toggleShowQR] = useState(false);
    const [notSupported, toggleNotSupported] = useState(false);
    const [invalidError, setInvalidError] = useState(false);
    const [validAddress, isValid] = useState(true);
    const [isMobile] = useState(mobileCheck())
    const [ethereum] = useState(() => assignEthereum());
    const [brightIdStoreLink] = useState(androidOrIphoneLink());
    
    const [authenticated, setAuthenticated] = useState<string[]>([]);

    useEffect(() => {
        updateAddress(accounts[0]);
        if (accounts[0] && !checkAuthenticated(accounts[0], authenticated)) {
            console.log('not authenticated')
            sponsor();
        } 
        else if (accounts[0] && checkAuthenticated(accounts[0], authenticated)) {
            console.log('authenticated')
            sponsor();
        }
    }, [accounts, authenticated])

    const initWeb3 = async() => {
        try {
          const web3 = await getWeb3()
          await configureWeb3(web3)
    
          // @ts-ignore
          window.ethereum.on('accountsChanged',
          async () => await configureWeb3(web3))
    
        } catch(e) {
          alert('Web3 login could not be detected')
        }
    }

    const configureWeb3 = async(web3: Web3) => {
        setInstance(new web3.eth.Contract(SPONSOR_CONTRACT_ABI, SPONSOR_CONTRACT_ADDRESS));
        setAuthenticated(await getAuthenticated());
        setAccounts(await web3.eth.getAccounts());
      }

    const sponsor = async () => {
        console.log('sponsoring')
        if (contractInstance !== undefined) {
            console.log('sponsoring 2')
            await contractInstance.methods.sponsor(accounts[0])
            .send({
                from: accounts[0]
            })
            .on('transactionHash', (hash: any) => {
                console.log(hash)
            })
            .on('confirmation', (confirmationNumber: any, receipt: any) => {
                console.log(confirmationNumber)
            })
            .on('receipt', (receipt: any) => {
                console.log(receipt);
            })
            .on('error', (error: any, receipt: any) => {
                console.log(error);
            })
            }
    }

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
        window.location.assign(deepLinkPrefix + `${address}`)
    }

    return (
        <Form>
            <div className="main-form">
                {/* <Input
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
                </FormFeedback> */}
                <div className="btn-selection">
                    <Button className="btn"
                        onClick={() => initWeb3()}
                        // size=""
                        color="neutral"
                        type="button"
                    >
                        <div className="btn-inner-container">
                            <div className="selection-header">
                                <img src={web3logo} alt=""/>
                                <h3>Ethereum wallet</h3>
                            </div>
                            <p>
                               Link <strong>BrightID</strong> to your Ethereum account directly with a supported wallet:
                            </p>
                            <p className="small-caps">Metamask, WalletConnect, Authereum</p>
                            <p id="recommended">Recommended</p>
                        </div>
                    </Button>
                    <Button className="btn"
                        onClick={() => sponsor()}
                        // size=""
                        color="neutral"
                        type="button"
                    >
                        <div className="btn-inner-container">
                            <div className="selection-header">
                                <img src={manualInput} alt=""/>
                                <div className="selection-title">
                                    <h3>Manually</h3>
                                    <p>— OR —</p>
                                    <h3>ENS</h3>
                                </div>
                            </div>
                            <p>Enter your ENS domain or paste your Ethereum address</p>
                            <p>
                               Manually sponsor yourself via the BrightID contract
                            </p>
                            <p id="advanced">Advanced</p>
                        </div>   
                    </Button>
                </div>
                {/* <Button
                    onClick={() => sponsor()}
                    size="lg"
                    color="neutral"
                    type="button"
                >
                    Sponsor
                </Button> */}
                {/* {
                    // TODO: Unify button functionality
                    isMobile ?
                        (
                            <Button
                                onClick={submitAddress}
                                size="lg"
                                color="neutral"
                                type="submit"
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
                            type="submit"
                            disabled={!input}
                        >
                            Submit
                        </Button>
                } */}
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
