import Web3 from "web3";
import Web3Modal from "web3modal";
// @ts-ignore
import WalletConnectProvider from '@walletconnect/web3-provider';
import Authereum from 'authereum';

const providerOptions = {
  walletconnect: {
      package: WalletConnectProvider,
      options: {
      infuraId: 'f1d9de7ebcd04578b9f5696f04760115'
      }
  },
  authereum: {
      package: Authereum,
      options: {}
  },
};

const getWeb3 = (): Promise<Web3> => (
    new Promise(async(resolve, reject) => {
      try {
        const web3Modal = new Web3Modal({
          network: 'mainnet',
          theme: "dark",
          providerOptions
        })
  
        const provider = await web3Modal.connect()
        let web3 = new Web3(provider)
  
        resolve(web3)
      } catch(e){
        reject(e)
      }
    })
  );
  
  export default getWeb3;