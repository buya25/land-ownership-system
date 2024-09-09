// Import Web3 based on version
let Web3;
try {
    Web3 = require('web3').Web3;  // For Web3 v4.x
} catch (error) {
    Web3 = require('web3');  // For Web3 v1.x
}


async function main() {
    // Check if MetaMask is installed
    if (typeof window !== 'undefined' && window.ethereum) {
        console.log("MetaMask is installed!");

        // Create a new Web3 instance using the MetaMask provider
        const web3 = new Web3(window.ethereum);

        try {
            // Request user accounts from MetaMask
            const accounts = await web3.eth.requestAccounts();
            console.log("Connected account:", accounts[0]);

            // Replace with your contract's ABI and address
            const contractABI = [
                {
                    "inputs": [
                        { "internalType": "string", "name": "location", "type": "string" },
                        { "internalType": "uint256", "name": "size", "type": "uint256" }
                    ],
                    "name": "registerLandParcel",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ];
            const contractAddress = process.env.CONTRACT_BYTE_CODE; // Replace with your contract address

            // Create contract instance
            const contract = new web3.eth.Contract(contractABI, contractAddress);
            console.log("Contract instance created.");

            const balance = await web3.eth.getBalance(accounts[0]);
            console.log(`Wallet balance: ${web3.utils.fromWei(balance, 'ether')} ETH`);

            // Register the land parcel
            console.log("Registering land parcel with location:", location, "and size:", size);
            const tx = await contract.methods.registerLandParcel(location, size).send({ from: accounts[0] });

            
            console.log("Transaction sent. Waiting for confirmation...");
            console.log("Transaction confirmed:", tx.transactionHash);

        } catch (error) {
            console.error("Error interacting with MetaMask or contract:", error);

            // Enhanced error handling based on error types
            if (error.code === 'TIMEOUT') {
                console.error("Connection timed out. Please check your internet connection.");
            } else if (error.code === 'NETWORK_ERROR') {
                console.error("Network error. Please check if the Ethereum node is accessible.");
            } else if (error.reason) {
                console.error(`Smart contract error: ${error.reason}`);
            } else {
                console.error(`An unknown error occurred: ${error.message}`);
            }
        }
    } else {
        console.error("MetaMask is not installed. Please install MetaMask.");
    }
}

main().then(() => console.log("Script completed")).catch((error) => {
    console.error("Unhandled error:", error);
});
