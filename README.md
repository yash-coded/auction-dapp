# Auction DApp

This is a decentralized auction application built using modern web technologies and blockchain. The application allows users to create and participate in auctions using Ethereum.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered and static web applications.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Ethers.js**: A library for interacting with the Ethereum blockchain and its ecosystem.
- **MetaMask SDK**: A library for integrating MetaMask into web applications.
- **React Hook Form**: A library for managing form state and validation in React.
- **React Query**: A library for fetching, caching, and updating asynchronous data in React.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **Lucide React**: A library of icons for React.
- **React Icons**: A library of popular icons for React.
- **date-fns**: A library for manipulating JavaScript dates in a functional way.
- **Copy to Clipboard**: A React component for copying text to the clipboard.
- **Radix UI**: A library of unstyled, accessible components for building high-quality design systems and web apps.

## Features

- **Create Auction**: Users can create new auctions by providing details such as name, description, image URL, starting bid, and duration.
- **Sign Transactions**: Users can sign transactions using MetaMask to interact with the Ethereum blockchain.
- **Real-time Updates**: The application uses React Query to fetch and update auction data in real-time.
- **Form Validation**: The application uses React Hook Form for managing form state and validation.
- **Responsive Design**: The application is styled using Tailwind CSS to ensure a responsive and modern design.
- **Wallet Integration**: Users can connect their MetaMask wallet to interact with the application.
- **Auction Management**: Users can view, bid on, and manage their auctions.
- **Notifications**: Users receive toast notifications for various actions such as successful bids and auction creation.

## Project Structure

- **`src/app`**: Contains the main application pages and global styles.
- **`src/components`**: Contains reusable UI components such as buttons, inputs, and custom components for the auction functionality.
- **`src/context`**: Contains context providers for managing global state such as wallet and query providers.
- **`src/contracts`**: Contains the ABI (Application Binary Interface) for interacting with the smart contract.
- **`src/hooks`**: Contains custom hooks for managing toast notifications.
- **`src/requests`**: Contains functions for interacting with the Ethereum blockchain, such as creating auctions, placing bids, and ending auctions.
- **`public`**: Contains static assets such as images.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MetaMask extension installed in your browser

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/auction-dapp.git
   cd auction-dapp
   ```

2. Install the dependencies:

   ```bash
    npm install
   ```

3. Create a `.env.local` file in the root directory and add the following environment variables:

```
NEXT_PUBLIC_AUCTION_MANAGER_CONTRACT_ADDRESS=your_contract_address
```

### Running the Application

```bash
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

### Usage

1. Connect Wallet: Click on the "Connect Wallet" button to connect your MetaMask wallet.
2. Create Auction: Navigate to the "Create Auction" page and fill out the form to create a new auction.
3. View Auctions: View all active auctions on the home page.
4. Place Bid: Place a bid on an auction by entering the bid amount and confirming the transaction.
5. Manage Auctions: View and manage your auctions on the "My Auctions" page.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
