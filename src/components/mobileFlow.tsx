import React, { useState, useEffect } from "react";
import { Button, Input, FormGroup, FormFeedback, Modal, Label, Container, ModalBody, Form } from 'reactstrap';
import Web3 from 'web3'

import { androidOrIphoneLink } from "../util/detectMobile"
import { DEEPLINK } from '../assets/constants/parameters'
import { convertENS } from '../util/ens'
import { getWeb3 } from "../util/web3";

import brightId from '../assets/img/brightid.svg'
import metamask from '../assets/img/metamask.png'

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

    const getAddress = async () => {
        try {
          const web3 = await getWeb3()
          const accounts = await web3.eth.getAccounts()

          updateInput(accounts[0])

        } catch(e) {
          alert('Web3 login could not be detected')
        }
    }

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
        window.location.assign(DEEPLINK + `${address}`)
    }

    const resetState = () => {
        updateInput("");
        toggleShowQR(false);
        toggleNotSupported(false);
    }

    return (
        <Form>
          <div className="main-form">
             {!showQR &&
              <div>
                <div className="mobile-brand">
                  <img src={brightId} alt="" />
                </div>
                <p>Enter your Ethereum address or ENS Domain</p>
                <FormGroup>
                  {input == '' &&
                    <Label for="ethereumAddress">
                      <Button onClick={getAddress}>
                        <img src={metamask}/>
                      </Button>
                    </Label>
                  }
                  <Input
                    onChange={handleChange}
                    id="ethereumAddress"
                    spellCheck={false}
                    autoComplete="off"
                    className="main-input"
                    placeholder="0x83...c403"
                    value={input}
                    invalid={invalidError}
                  />
                  <FormFeedback id="invalidAddress">
                    Looks like this wallet address is invalid
                  </FormFeedback>
                </FormGroup>
                <Button
                  onClick={submitAddress}
                  size="lg"
                  color="primary"
                  type="submit"
                  disabled={!validAddress}
                >
                  Submit
                </Button>
              </div>
            }
            {
              showQR && !notSupported &&
               <Container>
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
                        Click the <strong>Link</strong> button below to link this address to your BrightID account using the BrightID mobile app
                     </li>
                   </ol>
                 </div>
                 <div className="modal-footer">
                   <Button
                     onClick={() => openAppOrAppStore()}
                     size="lg"
                     color="primary"
                     type="button"
                    >
                      Link
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
                </Container>
                }
                {
                  notSupported &&
                    <div>
                      <Container>
                        <p>Unfortunately, the BrightID app is not available for your mobile operating system.</p>
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
                     </Container>
                  </div>
                }
            </div>

        </Form>
    )
}
