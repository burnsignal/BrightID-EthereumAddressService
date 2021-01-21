import React from 'react'
import Web3 from "web3";

import WalletConnectProvider from '@walletconnect/web3-provider';
import Authereum from 'authereum';

declare global {
    interface Window { ethereum: any; }
}

const infuraId = 'f1d9de7ebcd04578b9f5696f04760115';

export const getWeb3 = (source): Promise<Web3> => (
    new Promise(async(resolve, reject) => {
      try {
        let provider;

        if(source === 'walletconnect'){
          provider = new WalletConnectProvider({ infuraId });
          await provider.enable();
        } else if(source === 'metamask'){
          await window.ethereum.enable();
          provider = window.ethereum;
        } else {
          let authereum = new Authereum('mainnet');
          provider = authereum.getProvider();
        }

        let web3 = new Web3(provider)
        resolve(web3)
      } catch(e){
        reject(e)
      }
    })
  );
