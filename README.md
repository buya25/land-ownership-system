# Decentralized Land Ownership and Verification System

## Overview

This project is a decentralized application (DApp) built for managing and verifying land ownership using blockchain technology. It allows users to register, transfer, and verify land ownership in a secure, transparent, and immutable manner. The system leverages **Smart Wallet** to make it easier for users to interact with the blockchain without requiring technical expertise. This project was developed as part of the ETHSafari Hackathon, with a focus on solving land ownership challenges in Africa.

## Features

- **Land Registration**: Users can register land parcels with detailed information such as location, size, and ownership.
- **Ownership Transfer**: Landowners can securely transfer ownership of land parcels to other users via smart contracts.
- **Parcel Search**: Search for land parcels using parcel IDs and view the current ownership details.
- **Ownership Verification**: Verify the authenticity of land ownership on the blockchain using a unique parcel ID.
- **User Authentication with Smart Wallet**: Integrated **Smart Wallet** for easy blockchain interaction, allowing users to create wallets and sign transactions without requiring MetaMask or other external wallet services.
- **Transaction Proof**: All transactions are processed on-chain, with proof of transaction available on the Base Sepolia testnet.

## Technology Stack

- **Frontend**: React.js, Bootstrap
- **Backend**: Node.js, Express.js
- **Blockchain**: Ethereum, Solidity, Web3.js, Base Sepolia Testnet
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **Wallet Integration**: Smart Wallet

## Project Structure

- `frontend/`: Contains the React application responsible for the user interface.
- `backend/`: Contains the Express.js application for server-side logic and API handling.
- `smart-contract/`: Contains Solidity smart contracts for managing land registration, ownership transfers, and verification on the blockchain.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Smart Wallet integration
- Truffle (optional for smart contract testing and deployment)

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/buya25/land-ownership-dapp.git
   cd land-ownership-dapp
   ```

2. **Install Dependencies**:

   For the backend:
   ```bash
   cd backend
   npm install
   ```

   For the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

3. **Set Up Environment Variables**:

   Create a `.env` file in the `backend` directory and add the following environment variables:
   
   ```plaintext
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   BASE_API_URL=https://sepolia.base.org (or mainnet URL)
   ```

4. **Run the Application**:

   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```

   - Start the frontend server:
     ```bash
     cd ../frontend
     npm start
     ```

5. **Deploy Smart Contracts**:

   Use **Remix.ethereum** or **Truffle** to deploy the smart contracts located in the `smart-contract` directory. Ensure they are deployed to the **Base Sepolia Testnet** for hackathon purposes.

## Usage

1. **Sign Up and Login**: Users can sign up using their email or log in using the authentication system powered by **Smart Wallet**.
2. **Register Land**: Once authenticated, users can register new land parcels by entering the location, size, and other relevant information.
3. **Transfer Ownership**: Users can search for an existing land parcel using its ID and transfer ownership to another user securely.
4. **Verify Ownership**: Enter a parcel ID to verify the current ownership status on the blockchain.
5. **Smart Wallet Integration**: Users can seamlessly create and manage their blockchain wallets using Smart Wallet, ensuring easy interaction without complex wallet setups.

## Proof of Transaction

This application is live on the **Base Sepolia Testnet**. Here’s a sample transaction hash for verification:

- Transaction Hash: `0x1234abcd5678efgh...` (Link to Base Explorer)

## Challenges Faced

- **Smart Contract Deployment**: Managing gas fees and ensuring contracts were successfully deployed on the Base Sepolia testnet.
- **Smart Wallet Integration**: Implementing a seamless user experience for wallet creation and transaction management using Smart Wallet.
- **UI/UX**: Ensuring that the user interface is intuitive, especially for users unfamiliar with blockchain technology.

## Contributions

- **Ouma Yabs Mullo** - [yabsmullo0@gmail.com](mailto:yabsmullo0@gmail.com)
- **Stanley Odhiambo Ochieng** - [gexlabellautcure@gmail.com](mailto:gexlabellautcure@gmail.com)
- **Elly Kingsley**- [ellykingsley1960@gmail.com](mailto:ellykingsley1960@gmail.com)

## Inspiration

This project was inspired by the need for transparent and secure land ownership systems in regions that face challenges such as fraud, corruption, and poor land management practices. By leveraging blockchain technology, we aim to create a solution that improves transparency, reduces disputes, and ensures that land records are immutable and tamper-proof.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

## Contact

For more information or questions about the project, please contact the maintainers:
- Ouma Yabs Mullo - [yabsmullo0@gmail.com](mailto:yabsmullo0@gmail.com)
- Stanley Odhiambo Ochieng - [gexlabellautcure@gmail.com](mailto:gexlabellautcure@gmail.com)
- Elly Kingsley- [ellykingsley1960@gmail.com](mailto:ellykingsley1960@gmail.com)
