const { ethers } = require("hardhat");
const fs = require("fs");
async function main() {
  const Token = await ethers.deployContract("Token");
  console.log("Token deployed to:", Token.target);
  
  fs.writeFileSync("contractAddress", Token.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});