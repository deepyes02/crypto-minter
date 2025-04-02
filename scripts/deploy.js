const { ethers } = require("hardhat");
const fs = require("fs");
async function main() {
  const Token = await ethers.deployContract("Token");
  console.log("Token deployed to:", Token.target);
  
  // fs.writeFileSync("contractAddress", Token.target);
    // Save contract address and ABI
    const data = {
      address: Token.target,
      abi: (await ethers.getContractFactory("Token")).interface.format("json"),
    };
    fs.writeFileSync("frontend/src/contractData.json", JSON.stringify(data, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});