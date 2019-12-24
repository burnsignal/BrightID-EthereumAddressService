import { ethers } from "ethers";


export const assignEthereum = () => {
    if (typeof window.ethereum !== 'undefined') {
        return window.ethereum
    }
    return false
}

export const convertENS = async (name) => {
  const provider = ethers.getDefaultProvider()
  console.log("convertENS: " + name)
  const address = await provider.resolveName(name)
  return address
}
