const { expect } = require("chai");
const { ethers } = require("hardhat");

async function getBalanceOfAllAccounts(signers, token) {
  const balances = [];
  for (const account of signers) {
    const balance = await token.balanceOf(account.address);
    balances.push(balance);
  }
  return balances;
}

describe("Token contract", () => {
  it("On Deployment, I should have the total supply of tokens", async () => {
    const signers = await ethers.getSigners();
    //the first address is the owner
    const [me] = await signers;
    const token = await ethers.deployContract("Token");
    const myBalance = await token.balanceOf(me.address);
    const totalSupply = await token.totalSupply();
    const balances = await getBalanceOfAllAccounts(signers, token);
    expect(totalSupply).to.equal(myBalance);
    console.log(balances);
  });

  it("Should transfer tokens between accounts", async () => {
    const signers = await ethers.getSigners();
    const [me, addr1, addr2] = signers;
    const token = await ethers.deployContract("Token");
    //transfer 100 tokens from me to addr1
    await token.transfer(addr1.address, 100);
    const addr1Balance = await token.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(100);

    //transfer 50 tokens from addr1 to addr2
    await token.connect(addr1).transfer(addr2.address, 50);
    const addr2Balance = await token.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(50);

    const balances = await getBalanceOfAllAccounts(signers, token);
    const myBalance = await token.balanceOf(me.address);
    expect(myBalance).to.equal(balances[0]);
    console.log(balances);
  });
});
