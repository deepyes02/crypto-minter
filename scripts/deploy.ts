import { ethers } from "hardhat";
import fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();


// For a simpler script, refer to deploy-testnet.ts which only has barebones before deploying the contract. This script is more complex and includes sending ETH to two MetaMask addresses after deploying the contract. The contract is deployed to the Sepolia testnet, and the addresses are specified in the .env file. The script also saves the contract address and ABI to a JSON file for use in a frontend application.
// This script deploys a smart contract to the Sepolia testnet and sends 1 ETH to two specified MetaMask addresses. It also saves the contract address and ABI to a JSON file for use in a frontend application. Not sure how safe that is but we will see

async function main() {
  // Deploy the contract
  const Token = await ethers.deployContract("Token");
  const [owner] = await ethers.getSigners();

  const metaMaskAddress = process.env.METAMASK_ADDRESS_1 || "";
  const metaMaskAddress2 = process.env.METAMASK_ADDRESS_2 || "";

  // Transfer 1 ETH (1000000000000000000 wei) from the owner to MetaMask address
  const tx = await owner.sendTransaction({
    to: metaMaskAddress,
    value: ethers.parseEther("1.0"),  // Sending 1 ETH
  });
  const tx2 = await owner.sendTransaction({
    to: metaMaskAddress2,
    value: ethers.parseEther("1.0"),  // Sending 1 ETH
  });
  

  await tx.wait(); await tx2.wait();
  console.log(`1 ETH has been sent to: ${metaMaskAddress}`);
  console.log(`1 ETH has been sent to: ${metaMaskAddress2}`);

  await Token.waitForDeployment();
  console.log("Token deployed to:", Token.target);
  // Save contract address and ABI
  const contractFactory = await ethers.getContractFactory("Token");
  const abi = contractFactory.interface.format(true) as string[];
  const data = {
    address: Token.target,
    abi: abi,
  };
  fs.writeFileSync("frontend/src/contract.json", JSON.stringify(data, null, 2));
}

// Catch errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

