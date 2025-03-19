const { expect} = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", () => {
  it("On Deployment, I should have the total supply of tokens", async () => {
    const signers = await ethers.getSigners();
    //the first address is the owner
    const [me] = await ethers.getSigners();
    const token = await ethers.deployContract("Token");
    const myBalance = await token.balanceOf(me.address);
    const totalSupply = await token.totalSupply();

    async function getBalanceOfAllAccounts(){
      const balances = [];
      for (const account of signers){
        const balance = await token.balanceOf(account.address);
        balances.push(balance);
      }
      return balances;
    }

    const balances = await getBalanceOfAllAccounts();
    console.log(balances);
    expect(totalSupply).to.equal(myBalance);
    console.log("test has run its course");
  })
})
