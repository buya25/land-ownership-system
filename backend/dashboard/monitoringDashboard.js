const { ethers } = require("ethers");

// Set up provider and contract instance
const provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID");
const contractAddress = "YOUR_CONTRACT_ADDRESS";
const abi = [
    "event ParcelRegistered(uint256 parcelId, address owner, string location)",
    "event ParcelUpdated(uint256 parcelId, string newDetails)",
    "event OwnershipTransferred(uint256 parcelId, address newOwner)"
];

const contract = new ethers.Contract(contractAddress, abi, provider);

// Listen for ParcelRegistered event
contract.on("ParcelRegistered", (parcelId, owner, location) => {
    console.log(`Parcel Registered: ID ${parcelId}, Owner ${owner}, Location ${location}`);
});

// Listen for ParcelUpdated event
contract.on("ParcelUpdated", (parcelId, newDetails) => {
    console.log(`Parcel Updated: ID ${parcelId}, New Details ${newDetails}`);
});

// Listen for OwnershipTransferred event
contract.on("OwnershipTransferred", (parcelId, newOwner) => {
    console.log(`Ownership Transferred: ID ${parcelId}, New Owner ${newOwner}`);
});
