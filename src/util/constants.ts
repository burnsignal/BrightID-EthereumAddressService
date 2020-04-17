import { AbiItem } from 'web3-utils'

export const SPONSOR_CONTRACT_ADDRESS = '0xdCDaDE0E1ecBFEb56cEC05DBe4d04E663b7885ec';
export const SPONSOR_CONTRACT_ABI: AbiItem[] = [
  {
    "inputs": [
      {
        "internalType": "contract BrightID", 
        "name": "_brightID", 
        "type": "address"
      }, 
      {
        "internalType": "bytes32", 
        "name": "_context", 
        "type": "bytes32"
      }
    ], 
    "stateMutability": "nonpayable", 
    "type": "constructor"
  }, 
  {
    "stateMutability": "payable", 
    "type": "fallback"
  }, 
  {
    "inputs": [], 
    "name": "brightID", 
    "outputs": [
      {
        "internalType": "contract BrightID", 
        "name": "", 
        "type": "address"
      }
    ], 
    "stateMutability": "view", 
    "type": "function"
  }, 
  {
    "inputs": [], 
    "name": "context", 
    "outputs": [
      {
        "internalType": "bytes32", 
        "name": "", 
        "type": "bytes32"
      }
    ], 
    "stateMutability": "view", 
    "type": "function"
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
  }, 
  {
    "stateMutability": "payable", 
    "type": "fallback"
  }
]