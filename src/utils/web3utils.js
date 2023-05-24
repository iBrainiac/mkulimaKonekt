import Web3 from 'web3'
import { abi } from './abi'
export const web3 = new Web3(window.ethereum)
export const contract = new web3.eth.Contract(abi, "0xB8063AAA4f8bAa4f62B5C23A47B739147DF8bdd5")

