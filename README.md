## Smart Contracts, testing and Interaction on the blockchain
Everyone says blockchain is the next best thing. 

Basically we use Solidity to write smart contracts that are compiled, and later can be interacted upon via Ether Javascript to run various operations like fetching information, moving balance and so on. 

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