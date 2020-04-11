import ENS from "ethjs-ens";


const ens = new ENS({ provider: window.web3.currentProvider, network: 1 });

export const convertENS = async (value) => {
    try {
      const result = await ens.lookup(value);
      return result
    } catch (e) {
      return value
    }
}
