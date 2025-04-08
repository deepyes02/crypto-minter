## Building smart contracts; testing and interaction on the blockchain ##
### A learning by doing example ###

**Don't use a live wallet address/ private key with real money for development purpose, of if you do, do not share your private keys on the internet**

From hardhat to testnet, this is real. 
Example of a smart contract deployed to the Ethernet testnet at the end of this tutorial:


## How does it work ##
We use Solidity to write smart contracts that are compiled, and later can be interacted upon via Ether Javascript to run various operations like fetching information, moving balance and so on. 

### Core dependencies ###
1. hardhat
2. solidity 0.8.29
3 node 22.14.0
4 npm 10.9.2

It's a simple local dev environment for ethereum blockchain. 

The code follows the original codebase but builds on it with testing

## See Token.sol for solidity code. ##
After, run: 
```bash
npx hardhat compile

## run hardhat test
npx hardhat test
//or custom script in package.json
npm run test 
```

## Deploy the network ##
1. First enable the network with ```npx hardhat node```
2. Then, deploy !
```bash
npx hardhat run scripts/deploy.js --network localhost
```
## Hard hat is now deployed. ##

Next, learning how to interact with it. 


## Project Structure ##

* `contracts/`: Contains the Solidity smart contract `Token.sol`.
* `scripts/`: Contains the deployment script `deploy.js`.
* `test/`: Contains test files for the smart contract.
* `hardhat.config.js`: Hardhat configuration file.

## Token.sol Functionality ##

The `Token.sol` contract implements a simple ERC-20 token with features like token transfer, balance checking, and total supply.

## Testing ##

The project includes unit tests using Mocha and Chai to verify the contract's functionality. Key test cases include:

* Verifying the initial total supply.
* Checking token balances after transfers.
* Testing for correct event emissions.

## Interaction ##

To interact with the deployed contract, you can use Ether.js. For example, to get the token balance of an address:

```javascript
// Example using Ether.js (within a Node.js script)
const { ethers } = require("ethers");
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your deployed contract address
const provider = new ethers.providers.JsonRpcProvider("[http://127.0.0.1:8545/](https://www.google.com/search?q=http://127.0.0.1:8545/)"); // Local Hardhat node
const token = new ethers.Contract(contractAddress, ["function balanceOf(address) view returns (uint256)"], provider);

async function getBalance(address) {
  const balance = await token.balanceOf(address);
  console.log(`Balance of ${address}: ${ethers.utils.formatEther(balance)}`);
}

getBalance("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"); // Example address◊
```

## FRONTEND ##
**Dependencies**
- React
- React Router
- Ether.js
- Webpack for compiling and tooling

Frontend is built with REACT
1. In the frontend folder, run `npm run dev` to start the local server
2. OR, `npm run build`

## METAMASK ##

Metamask suppport is added, however need to figure out : 
1. Passing data properly, 
2. connecting with local hardhat node (how it is happening, since we removed json rpc settings)
3. What to do when user has metamask, but hasn't authenticated, instead of regular error of duplicate
4. What to do after metamask is connected sucessfully

(update) : We have figured these out, however, still need to build an application that makes it possible to send and receive tokens. 
Also in the dApp, we should be able to display token values ! Basically we will be building the fundamentals of cryptic transactions with a beautiful UI.

## Installed dotenv package, connected with metamaskdeveloper for api keys and deployed to the testnet ##
For privacy to safeguard private keys and RCP urls ! 
- Rename .env.sample to .env and update values 
```bash
npm install dotenv
```
update .env file with RPC URL From https://developer.metamask.io/ (need to signup and create an api key)
```txt
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your-infura-project-id
PRIVATE_KEY=private-key-of-your-wallet

## for local development - you can not use this part of code if you want
METAMASK_ADDRESS_1=0xaddress-1
METAMASK_ADDRESS_2=0xaddress-2
```

### Update hardhat.config.ts ### 
First import and call the dotenv
```js
import * as dotenv from "dotenv";
dotenv.config();
// dotenv helps to load files from the .env file.

//then add the network
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
```

### Compile Solidity contract, and deploy ###
```sh
npx hardhat compile
$ npx hardhat run scripts/deploy-testnet.ts --network sepolia
Token deployed to: 0x4705559cDC3c8deDc0438ED5f3F090C8043F6792
The token address provided will be unique, which you can now use to view your blockchain ledger
```
Example : 
https://sepolia.etherscan.io/address/0x4705559cDC3c8deDc0438ED5f3F090C8043F6792