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