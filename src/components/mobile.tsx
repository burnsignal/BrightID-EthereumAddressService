import React, { useState, useEffect } from "react";
import Web3 from 'web3'

import { Button, TextField as Input, FormControl, FormLabel } from '@material-ui/core'
import { androidOrIphoneLink } from "../util/detectMobile"
import { DEEPLINK } from '../assets/constants/parameters'
import { convertENS } from '../util/ens'
import { getWeb3 } from "../util/web3";

import brightId from '../assets/img/brightid.svg'
import metamask from '../assets/img/metamask.png'
import useStyles from '../assets/css/components/mobile'

export const MobileFlow = () => {
    const [input, updateInput] = useState('');
    const [invalidError, setInvalidError] = useState(false);
    const [validAddress, isValid] = useState(true);
    const [address, updateAddress] = useState('');
    const [showQR, toggleShowQR] = useState(false);
    const [brightIdStoreLink] = useState(androidOrIphoneLink());
    const [notSupported, toggleNotSupported] = useState(false);
    const classes = useStyles();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateInput(e.target.value)
    };

    const getAddress = async () => {
        try {
          const web3 = await getWeb3('metamask')
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
        <div>
          {!showQR &&
            <div>
              <div>
                <img src={brightId} alt="" />
              </div>
              <p>Enter your Ethereum address or ENS Domain</p>
              <FormControl>
                {input == '' &&
                   <FormLabel>
                     <Button onClick={getAddress}>
                       <img src={metamask}/>
                     </Button>
                   </FormLabel>
                }
                <Input
                  onChange={handleChange}
                  id="ethereumAddress"
                  className="main-input"
                  placeholder="0x83...c403"
                  value={input}
                  error={invalidError}
                />
              </FormControl>
              <Button
                onClick={submitAddress}
                variant="contained"
                disabled={!validAddress}
              >
                Submit
              </Button>
            </div>
          }{showQR && !notSupported &&
            <div>
              <div style={{textAlign: 'left'}}>
                <ol>
                  <li style={{marginBottom: '10px'}}>
                    Please send an empty 0 value transaction to <strong>brightid.burnsignal.eth</strong> from
                    <p style={{ fontSize: '9px', fontWeight: 'bold', marginBottom: '0px' }}>
                      {address}
                    </p>
                    to register with the BrightID contract
                  </li>
                  <li>
                    Click the <strong>Link</strong> button below to link this address to your BrightID account using the BrightID mobile app
                  </li>
                </ol>
              </div>
              <div>
                <Button onClick={() => openAppOrAppStore()} variant='contained'>
                  Link
                </Button>
                <Button variant='contained' onClick={resetState}>
                  Close
                </Button>
              </div>
            </div>
          }{notSupported &&
            <div>
              <p>Unfortunately, the BrightID app is not available for your mobile operating system.</p>
              <div>
                <Button variant='contained' onClick={resetState}>
                  Close
                </Button>
              </div>
           </div>
         }
      </div>
    )
}
