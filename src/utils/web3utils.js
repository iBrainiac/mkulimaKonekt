import Web3 from "web3";
import { abi } from "./abi";
export const web3 = new Web3(window.ethereum);
export const contract = new web3.eth.Contract(
  abi,
  // "0xB8063AAA4f8bAa4f62B5C23A47B739147DF8bdd5"
  // "0xe513F9f3dB4F43DEBd7b11C47d9ffAfe815e7b45"
  //"0xe5439CA58Ea9E25e0aE3BfDaFEEAAe24d3a851E6"
  "0xBA87d5278A44D31B72F40A5dE8d2C026a735a356"
);

export async function login() {
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  const account = accounts[0];
  console.log(account);
}

export function isLoggedIn() {
  // Check if MetaMask is installed
  if (typeof window.ethereum !== "undefined") {
    // Check if the user is logged in to MetaMask
    if (window.ethereum.selectedAddress === null) {
      console.log("User is not logged in to MetaMask.");
      return false;
    } else {
      console.log("User is logged in to MetaMask.");
      console.log("Selected address:", window.ethereum.selectedAddress);
      return true;
    }
  } else {
    console.log("MetaMask is not installed.");
    return "not_installed";
  }
}
