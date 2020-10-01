import React, { useState, useEffect } from "react";
import web3logo from '../assets/img/web3js.jpg'
import { Button, Modal, Container, ModalBody } from 'reactstrap';
import { getWeb3 } from "../util/web3";
import { Contract } from 'web3-eth-contract';
import { SPONSOR_CONTRACT_ABI, SPONSOR_CONTRACT_ADDRESS } from "../util/constants";
import { getAuthenticated, checkAuthenticated } from "../util/brightID"
import Web3 from 'web3';
import BrightEthereumDeepLinkQR from "./qrGenerator";

export const DesktopFlow = () => {
    const [accounts, setAccounts] = useState<string[]>([]);
    const [contractInstance, setInstance] = useState<Contract>()
    const [showQR, toggleShowQR] = useState(false);
    const [authenticated, setAuthenticated] = useState<string[]>([]);
    const [address, updateAddress] = useState('');
    const [userAuthenticated, setUserAuthenticated] = useState(false);
    const [txSubmitted, setTxSubmitted] = useState(false);
    const [ web3Connection, setConnection ] = useState(false);

    useEffect(() => {
        updateAddress(accounts[0]);
        if (accounts[0] && !checkAuthenticated(accounts[0], authenticated)) {
            setUserAuthenticated(false);
        }
        else if (accounts[0] && checkAuthenticated(accounts[0], authenticated)) {
            setUserAuthenticated(true);
        }
    }, [accounts, authenticated])

    const maybeInitWeb3 = async () => {
        if (!contractInstance || accounts.length === 0) {
            await initWeb3();
            toggleShowQR(true);
        } else {
            toggleShowQR(true);
        }
    }

    const initWeb3 = async () => {
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
        setConnection(true)
      }

      const resetState = () => {
        toggleShowQR(false);
        setConnection(false)
    }

      const sponsor = async () => {
        if (contractInstance !== undefined) {
            await contractInstance.methods.sponsor(accounts[0])
            .send({
                from: accounts[0]
            })
            .on('transactionHash', () => {
                setTxSubmitted(true);
            })
            .on('error', (error: any) => {
                console.error('An error ocurred when attempting to sponsor with with BrightID', error);
            })
            }
    }

    return (
        <div>
        {
            !web3Connection &&
            <div className="btn-selection">
                <Button className="btn"
                    onClick={maybeInitWeb3}
                    color="neutral"
                    type="button"
                >
                    <div className="btn-inner-container">
                        <div className="btn-content">
                            <img src={web3logo} alt=""/>
                            <div className="btn-text">
                                <p>
                                    Link <strong>BrightID</strong> to your Ethereum account directly with a supported wallet:
                                </p>
                                <ul className="small-caps">
                                    <li>Metamask</li>
                                    <li>WalletConnect</li>
                                    <li>Authereum</li>
                                </ul>
                            </div>
                        </div>
                        <p><strong>Get started</strong></p>
                    </div>
                </Button>
          </div>
        }
        {
            showQR &&
            <div>
                    <Container>
                        <div>
                                <div>
                                    {
                                        userAuthenticated &&
                                        <div>
                                            <p>Your address:</p>
                                            <p><strong>{address}</strong></p>
                                            <p>is already verified with BrightID.</p>
                                        </div>
                                    }
                                    {
                                        !userAuthenticated && !txSubmitted &&
                                        <div>
                                            <p>
                                                Is this the address you would like to link with BrightID?
                                            </p>
                                            <p><strong>{address}</strong></p>
                                        </div>
                                    }
                                    {
                                        txSubmitted &&
                                        <div>
                                            <p>Scan the code with any QR scanner or the BrightID app to link your accounts and you're finished!</p>
                                            <BrightEthereumDeepLinkQR ethAddress={address} />
                                        </div>
                                    }
                                </div>
                                <Button
                                    size="lg"
                                    color="primary"
                                    type="button"
                                    onClick={resetState}
                                >
                                    Go back
                                </Button>
                                {
                                    !userAuthenticated && !txSubmitted &&
                                    <Button
                                        onClick={() => sponsor()}
                                        size="lg"
                                        color="warning"
                                        type="button">
                                        Continue
                                    </Button>
                                }
                        </div>
                    </Container>
            </div>
        }

    </div>
    )
}
