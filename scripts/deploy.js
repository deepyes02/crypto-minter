const {ethers} = require("hardhat");
async function main () {
  const Token = await ethers.deployContract("Token");
  console.log("Token deployed to:", Token.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});