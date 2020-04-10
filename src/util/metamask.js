import ENS from "ethjs-ens";


export const assignEthereum = () => {
    if (typeof window.ethereum !== 'undefined') {
        return window.ethereum
    }
    return false
}

const ens = new ENS({ provider: window.web3.currentProvider, network: 1 });

export const convertENS = async (value) => {
  if( value.includes('.eth') )
  {
    try {
      const result = await ens.lookup(value);
      return result
    } catch (e) {
      console.info(e.message);
      return value
    }
  }
  else {
    try {
      const resultName = await ens.reverse(value);
      return resultName
    } catch (e) {
      console.info( e.message);
      return value;
    }
  }
}
