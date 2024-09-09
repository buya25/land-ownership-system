/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();  // Make sure dotenv is required to load environment variables

const { PRIVATE_KEY } = process.env;

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      accounts: [
        {
          privateKey: `0x${PRIVATE_KEY}`,
          balance: "10000", // 10,000 ETH in wei
          timeout: 90000
        }
      ]
    },
    // Add other network configurations here
  },
  etherscan: {
    // Your Etherscan API key here if you plan to verify contracts on Etherscan
  },
  mocha: {
    timeout: 20000 // Set timeout for tests
  }
};
