require('dotenv').config();

// Import Web3 based on version
let Web3;
try {
    Web3 = require('web3').Web3;  // For Web3 v4.x
} catch (error) {
    Web3 = require('web3');  // For Web3 v1.x
}

// Create a new Web3 instance using an HTTP provider (replace with your provider URL)
const web3 = new Web3(process.env.ETH_NODE_URL);

// Your deployed contract address
const contractAddress = '0xC94cDaf98ca32767b4EA139E64bAA5E1225E2339';

// Your contract ABI
const contractAbi = [
    {
        "inputs": [
            { "internalType": "string", "name": "location", "type": "string" },
            { "internalType": "uint256", "name": "size", "type": "uint256" }
        ],
        "name": "registerLandParcel",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "string", "name": "parcelId", "type": "string" },
            { "internalType": "string", "name": "newLocation", "type": "string" },
            { "internalType": "uint256", "name": "newSize", "type": "uint256" }
        ],
        "name": "updateLandParcel",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "parcelId", "type": "uint256" }
        ],
        "name": "getOwner",
        "outputs": [
            { "internalType": "address", "name": "", "type": "address" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Create contract instance
const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Function to register a land parcel
async function registerLandParcel(location, size) {
    try {
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];  // Select the first account

        console.log('Registering land parcel with location:', location, 'and size:', size);
        console.log('Using account:', account);
        
        // Check contract state before transaction
        console.log('Contract address:', contractAddress);
        const contractCode = await web3.eth.getCode(contractAddress);
        // if (contractCode === '0x' || contractCode === '0x0') {
        //     throw new Error('No contract code at the specified address');
        // }

        // Ensure `size` is converted to `BigInt` if it's a large number
        const bigSize = BigInt(size);  // Convert `size` to BigInt if it's not already

        // Prepare transaction data
        const data = contract.methods.registerLandParcel(location, bigSize).encodeABI();

        // Estimate gas with more information
        const gasEstimate = await web3.eth.estimateGas({
            from: account,
            to: contractAddress,
            data: data
        });

        console.log('Estimated gas:', gasEstimate);

        // Get gas price
        const gasPrice = await web3.eth.getGasPrice();
        console.log('Current gas price:', gasPrice);

        // Prepare transaction
        const tx = {
            from: account,
            to: contractAddress,
            gas: gasEstimate, 
            gasPrice: gasPrice,
            data: data
        };

        // Send transaction
        const receipt = await web3.eth.sendTransaction(tx);

        console.log('Transaction confirmed:', receipt.transactionHash);
        return { success: true, transactionHash: receipt.transactionHash };
    } catch (error) {
        console.error('Error registering land parcel:', error);

        // Detailed error logging
        if (error.message.includes('invalid opcode')) {
            console.error('Contract execution failed. This might be due to:');
            console.error('1. An unhandled revert in the contract');
            console.error('2. Incorrect function parameters');
            console.error('3. Insufficient gas');
            console.error('4. A bug in the contract code');
            
            // Try to get more details
            try {
                const result = await contract.methods.registerLandParcel(location, size).call({ from: accounts[0] });
                console.error('Call result:', result);
            } catch (callError) {
                console.error('Call also failed:', callError.message);
            }
        }

        // Enhanced error handling based on error types
        if (error.code === 'TIMEOUT') {
            return { success: false, error: 'Connection timed out. Please try again.' };
        } else if (error.code === 'NETWORK_ERROR') {
            return { success: false, error: 'Network error. Please check your connection.' };
        } else {
            return { success: false, error: `An error occurred: ${error.message}` };
        }
    }
}

/**
 * UPDATING THE LAND PARCEL
 * **/

// Function to update a land parcel
async function updateLandParcelScript(parcelId, newLocation, newSize) {
    try {
        const accounts = await web3.eth.getAccounts();
        const account = accounts[1];  // Select the first account

        console.log('Updating land parcel with ID:', parcelId);
        console.log('New location:', newLocation, 'New size:', newSize);
        console.log('Using account:', account);

        // Convert size to BigInt if necessary
        const bigSize = BigInt(newSize);

        // Prepare transaction data
        const data = contract.methods.updateLandParcel(parcelId, newLocation, bigSize).encodeABI();

        // Estimate gas with more information
        const gasEstimate = await web3.eth.estimateGas({
            from: account,
            to: contractAddress,
            data: data
        });

        console.log('Estimated gas:', gasEstimate);

        // Get gas price
        const gasPrice = await web3.eth.getGasPrice();
        console.log('Current gas price:', gasPrice);

        // Prepare transaction
        const tx = {
            from: account,
            to: contractAddress,
            gas: gasEstimate,
            gasPrice: gasPrice,
            data: data
        };

        // Send transaction
        const receipt = await web3.eth.sendTransaction(tx);

        console.log('Transaction confirmed:', receipt.transactionHash);
        return { success: true, transactionHash: receipt.transactionHash };
    } catch (error) {
        console.error('Error updating land parcel:', error);

        // Detailed error logging
        if (error.message.includes('invalid opcode')) {
            console.error('Contract execution failed. This might be due to:');
            console.error('1. An unhandled revert in the contract');
            console.error('2. Incorrect function parameters');
            console.error('3. Insufficient gas');
            console.error('4. A bug in the contract code');

            // Try to get more details
            try {
                const result = await contract.methods.updateLandParcel(parcelId, newLocation, newSize).call({ from: accounts[0] });
                console.error('Call result:', result);
            } catch (callError) {
                console.error('Call also failed:', callError.message);
            }
        }

        // Enhanced error handling based on error types
        if (error.code === 'TIMEOUT') {
            return { success: false, error: 'Connection timed out. Please try again.' };
        } else if (error.code === 'NETWORK_ERROR') {
            return { success: false, error: 'Network error. Please check your connection.' };
        } else {
            return { success: false, error: `An error occurred: ${error.message}` };
        }
    }
}


async function transferOwnership(parcelId, newOwner) {
    try {
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        const tx = await contract.methods.transferOwnership(parcelId, newOwner).send({ from: account });
        return { success: true, transactionHash: tx.transactionHash };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function getOwner(parcelId) {
    try {
        const owner = await contract.methods.getOwner(parcelId).call();
        return { success: true, owner };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function getLandParcelDetails(parcelId) {
    try {
        const details = await contract.methods.getLandParcelDetails(parcelId).call();
        return { success: true, details };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

module.exports = {
    registerLandParcel,
    updateLandParcelScript,
    transferOwnership,
    getOwner,
    getLandParcelDetails
};