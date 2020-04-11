import ENS from "ethjs-ens";


const ens = new ENS({ provider: window.web3.currentProvider, network: 1 });

export const convertENS = async (value) => {
  if( value.includes('.eth') )
  {
    try {
      const result = await ens.lookup(value);
      return result
    } catch (e) {
      return value
    }
  }
  else {
    try {
      const resultName = await ens.reverse(value);
      return resultName
    } catch (e) {
      return value;
    }
  }
}
