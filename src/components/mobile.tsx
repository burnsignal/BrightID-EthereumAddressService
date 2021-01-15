import React, { useState, useEffect } from "react";
import Web3 from 'web3'

import { Button as BlankButton, FormControl, FormLabel } from '@material-ui/core'
import { androidOrIphoneLink } from "../util/detectMobile"
import { DEEPLINK } from '../assets/constants/parameters'
import { convertENS } from '../util/ens'
import { getWeb3 } from "../util/web3";
import Button from './button'
import Input from './input'

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

    function LabelButton(){
      return(
        <FormLabel>
          {input == '' &&
            <BlankButton onClick={getAddress}>
              <img src={metamask}/>
            </BlankButton>
          }
        </FormLabel>
      )
    }

    return (
        <div>
          {!showQR &&
            <div className={classes.container}>
              <div>
                <img className={classes.logo} src={brightId} alt="" />
              </div>
              <p>Enter your Ethereum address or ENS Domain</p>
              <FormControl>
                <Input
                  onChange={handleChange}
                  id="ethereumAddress"
                  className="main-input"
                  placeholder="0x83...c403"
                  variant='outlined'
                  value={input}
                  error={invalidError}
                  InputProps={{
                    endAdornment: <LabelButton />
                  }}
                />
              </FormControl>
              <Button
                onClick={submitAddress}
                variant="outlined"
                disabled={!validAddress}
              >
                Submit
              </Button>
            </div>
          }{showQR && !notSupported &&
            <div className={classes.container}>
              <div className={classes.list}>
                <ol>
                  <li style={{marginBottom: '10px'}}>
                    Please send an empty 0 value transaction to <strong>brightid.burnsignal.eth</strong> from
                    <p className={classes.address}>
                      {address}
                    </p>
                    to register with the BrightID contract
                  </li>
                  <li>
                    Click the <strong>Link</strong> button below to link this address to your BrightID account using the BrightID mobile app
                  </li>
                </ol>
              </div>
              <div className={classes.buttons}>
                <div>
                  <Button onClick={() => openAppOrAppStore()} variant='outlined'>
                    Link
                  </Button>
                </div>
                <Button variant='outlined' onClick={resetState}>
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
