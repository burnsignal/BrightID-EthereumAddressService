import ENS from "ethjs-ens";
import HttpProvider from 'ethjs-provider-http';

let ens = {};

if (typeof window === 'object' && typeof window.web3 !== 'undefined') {
  ens = new ENS({ provider: window.web3.currentProvider, network: 1 });
} else {
  const provider = new HttpProvider('https://mainnet.infura.io/v3/f1d9de7ebcd04578b9f5696f04760115')
  ens = new ENS({ provider: provider, network: 1 });
}

export const convertENS = async (value) => {
  try {
    const result = await ens.lookup(value);
    return result
  } catch (e) {
    return value
  }
}
