require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      accounts: {
        count: 5, // Limit to 5 accounts
        accountsBalance: "100000000000000000000" // 100 ETH in wei
      }
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    }
  }
};