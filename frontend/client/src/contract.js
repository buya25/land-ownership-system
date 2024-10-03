import { ethers } from 'ethers';
import contractAbi from './contractAbi.json'; // ABI file of your contract

const contractAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';

let provider;
let contract;

export async function initializeContract() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractAbi, signer);
  } else {
    console.error('No Ethereum provider detected');
  }
}

export async function registerLandParcel(location, size) {
  if (contract) {
    try {
      const tx = await contract.registerLandParcel(location, size);
      await tx.wait();
      console.log('Land parcel registered successfully');
    } catch (error) {
      console.error('Error registering land parcel:', error);
    }
  }
}

// Other contract functions can be added here
