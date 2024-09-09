Here's a basic structure for your README file. You can customize it further based on your project's specific needs.

---

# Decentralized Land Ownership and Verification System

## Overview

This project is a decentralized application (DApp) built for land ownership management and verification using blockchain technology. It enables users to register, transfer, and verify land ownership in a secure and transparent manner. The project was developed as part of the ETHSafari Hackathon, focusing on the theme of creating innovations for Africa.

## Features

- **Land Registration:** Users can register land parcels with specific details like location, size, and ownership.
- **Ownership Transfer:** Landowners can transfer ownership to other users securely through smart contracts.
- **Parcel Search:** Users can search for land parcels using parcel IDs and view the current ownership details.
- **Ownership Verification:** The system allows for quick and reliable verification of land ownership using blockchain.
- **User Authentication:** Secure login and registration system using JWT tokens.

## Technology Stack

- **Frontend:** React.js, Bootstrap
- **Backend:** Node.js, Express.js
- **Blockchain:** Ethereum, Solidity, Web3.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT), bcrypt
- **Deployment:** MetaMask for Ethereum wallet integration, Remix.ethereum for smart contract deployment

## Project Structure

- **frontend:** Contains the React application for the user interface.
- **backend:** Contains the Express.js application for the server-side logic.
- **smart-contract:** Contains the Solidity contracts for managing land parcels and ownership.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- MetaMask (for Ethereum wallet integration)
- Truffle (optional for testing and deploying smart contracts)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/buya25/land-ownership-dapp.git
   cd land-ownership-dapp
   ```

2. **Install Dependencies**
   - For the backend:
     ```bash
     cd backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Set Up Environment Variables**
   - Create a `.env` file in the `backend` directory with the following variables:
     ```
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     ETHEREUM_NETWORK_URL=your_ethereum_network_url
     ```

4. **Run the Application**
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

5. **Deploy Smart Contracts**
   - Use Remix.ethereum or Truffle to deploy the smart contracts located in the `smart-contract` directory.

## Usage

1. **Sign Up and Login:** Create an account or log in using the authentication system.
2. **Register Land:** Register a new land parcel with the necessary details.
3. **Transfer Ownership:** Search for an existing land parcel and transfer its ownership to another user.
4. **Verify Ownership:** Use the parcel ID to verify the current ownership status on the blockchain.

## Challenges Faced

- **Smart Contract Deployment:** Managing gas fees and ensuring successful contract deployment on the Ethereum network.
- **Security:** Implementing a secure authentication system to protect user data.
- **User Interface:** Designing an intuitive UI that allows users to interact with the blockchain without needing technical knowledge.

## Inspiration

This project was inspired by the need for transparent and secure land management systems in regions with complex land ownership issues. By leveraging blockchain technology, we aim to provide a solution that can reduce fraud, increase transparency, and ensure that land ownership records are accurate and immutable.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request for any feature additions or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For more information, please contact the project maintainer at [yabsmullo0@gmail.com](mailto:yabmullo0@gmail.com).
