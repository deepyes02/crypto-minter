import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  // Deploy the contract
  const Token = await ethers.deployContract("Token");
  
  // Wait for the transaction to be mined

  await Token.waitForDeployment();
  console.log("Token deployed to:", Token.target);
  // Save contract address and ABI
  const contractFactory = await ethers.getContractFactory("Token");
  const abi = contractFactory.interface.format(true) as string[];
  const data = {
    address: Token.target,
    abi: abi,
  };
  fs.writeFileSync("frontend/src/contract-testnet.json", JSON.stringify(data, null, 2));
}

// Catch errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

