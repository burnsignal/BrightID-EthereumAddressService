import { AbiItem } from 'web3-utils';

export const DEEPLINK = "brightid://link-verification/http:%2f%2fnode.brightid.org/ethereum/";

export const BRIGHTID_ENDPOINT = 'https://sp.brightid.org/node/v4/verifications/ethereum';
export const SPONSOR_ADDRESS = '0xA4DDdF5C53F5FCa4d6901d14FAE463bC02638898';
export const SPONSOR_ABI: AbiItem[] = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "Sponsor",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "add",
        "type": "address"
      }
    ],
    "name": "sponsor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
