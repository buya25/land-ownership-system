// testEthers.js
const { ethers } = require('ethers');

const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/c2062c312e9940a3bdaa1d62724cb90e', undefined, { timeout: 90000 });
console.log('Provider connected:', provider);
