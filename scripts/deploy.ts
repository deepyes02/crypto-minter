import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  // Deploy the contract
  const Token = await ethers.deployContract("Token");
  const [owner] = await ethers.getSigners();
  const metaMaskAddress = "0x240c5D3960fFAB9ba9276F3A92C7178cD364c13d";
  const metaMaskAddress2 = "0x7c6d752c62587b9303F8a2cff2CcbA3d233dE1e1";

  // Transfer 1 ETH (1000000000000000000 wei) from the owner to MetaMask address
  const tx = await owner.sendTransaction({
    to: metaMaskAddress,
    value: ethers.parseEther("1.0"),  // Sending 1 ETH
  });
  const tx2 = await owner.sendTransaction({
    to: metaMaskAddress2,
    value: ethers.parseEther("1.0"),  // Sending 1 ETH
  });
  
  // Wait for the transaction to be mined
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

