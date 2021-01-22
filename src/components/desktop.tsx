import React, { useState, useEffect } from "react";
import { getWeb3 } from "../util/web3";
import { Contract } from 'web3-eth-contract';
import Web3 from 'web3'

import { SPONSOR_ABI } from "../assets/constants/parameters";
import { isAuthenticated } from "../util/brightID";
import brightId from '../assets/img/brightid.svg'
import useStyles from '../assets/css/components/desktop'
import metamask from '../assets/img/metamask.png'
import walletconnect from '../assets/img/walletconnect.png'
import authereum from '../assets/img/authereum.png'

import BrightEthereumDeepLinkQR from "./qrGenerator";
import Button from './button';
import Blockie from "./blockie";

export const DesktopFlow = ({ sponsorAddress, provider }) => {
    const [accounts, setAccounts] = useState<string[]>([]);
    const [contractInstance, setInstance] = useState<Contract>()
    const [showQR, toggleShowQR] = useState(false);
    const [address, updateAddress] = useState('');
    const [userAuthenticated, setUserAuthenticated] = useState(false);
    const [txSubmitted, setTxSubmitted] = useState(false);
    const [ web3Connection, setConnection ] = useState(false);
    const [ nonSponsor, setNon ] = useState(false);
    const classes = useStyles();

    const maybeInitWeb3 = async (instance) => {
        if (!provider || !contractInstance || accounts.length === 0) {
            await initWeb3(instance);
        } else {
            toggleShowQR(true);
        }
    }

    const initWeb3 = async (provider) => {
        try {
          const web3 = await getWeb3(provider)
          await configureWeb3(web3)
          toggleShowQR(true);

          // @ts-ignore
          window.ethereum.on('accountsChanged',
          async () => await configureWeb3(web3))

        } catch(e) {
          alert('Web3 login could not be detected')
        }
    }

    const configureWeb3 = async(web3: Web3) => {
        let accs = await web3.eth.getAccounts();
        let isAuthenticated = await isAuthenticated(accs[0]);
        let contract = new web3.eth.Contract(SPONSOR_ABI, sponsorAddress);

        setInstance(contract);
        setUserAuthenticated(isAuthenticated);
        updateAddress(accs[0]);
        setAccounts(accs);
      }

      const resetState = () => {
        toggleShowQR(false);
        setNon(false)
      }

     const sponsor = async () => {
        if(sponsorAddress){
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
       } else {
         setNon(true)
      }
    }

    return (
        <div>
          {!showQR &&
              <div>
                <p>
                  Link <b>BrightID</b> to your Ethereum account directly with a supported wallet:
                </p>
                <div className={classes.row}>
                  <div className={classes.image}>
                    <img className={classes.logo} src={brightId} alt="" />
                  </div>
                  <ul className={classes.list}>
                    <li onClick={() => maybeInitWeb3('metamask')}>
                      <img src={metamask} /> <span> Metamask </span>
                    </li>
                    <li onClick={() => maybeInitWeb3('walletconnect')}>
                      <img src={walletconnect} /> <span> Walletconnect </span>
                    </li>
                    <li onClick={() => maybeInitWeb3(null)}>
                      <img src={authereum} /> <span> Authereum </span>
                    </li>
                  </ul>
               </div>
              <label className={classes.copyright}>
                © {new Date().getFullYear()} Bright Ethereum{" "}
              </label>
            </div>
          }{showQR &&
            <div className={classes.container}>
              {!userAuthenticated && !nonSponsor &&
                <>
                  <p>
                    Is this the address you would like to link with BrightID?
                  </p>
                  <div className={classes.column}>
                    <div>
                      <Blockie address={address} />
                      <p>
                        <span>{address.substring(0, 6)}...{address.substring(38, 64)}</span>
                      </p>
                    </div>
                  </div>
                </>
              }{userAuthenticated &&
                <>
                  <div className={classes.column}>
                    <div>
                      <Blockie address={address} />
                      <p>
                        <span>{address.substring(0, 6)}...{address.substring(38, 64)}</span>
                      </p>
                    </div>
                    <p>is already verified with BrightID.</p>
                  </div>
                </>
              }{txSubmitted || nonSponsor &&
                <>
                  <p>Scan the code with any QR scanner or the BrightID app to link your accounts and you're finished!</p>
                  <div className={classes.column}>
                    <div>
                      <BrightEthereumDeepLinkQR ethAddress={address} />
                    </div>
                  </div>
                </>
              }
              <div className={classes.buttons}>
                <div>
                  <Button variant='outlined' onClick={resetState}>
                    Go back
                  </Button>
                </div>
                {!userAuthenticated && !nonSponsor &&
                  <Button onClick={() => sponsor()} variant='outlined'>
                    Continue
                  </Button>
                }
             </div>
          </div>
         }
      </div>
    )
}
