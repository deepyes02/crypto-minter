import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import { HardhatUserConfig } from "hardhat/config";


const config: HardhatUserConfig = {
  solidity: "0.8.28",
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v6"
  },
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: {
        count: 5, // Limit to 5 accounts
        accountsBalance: "100000000000000000000" // 100 ETH in wei
      }
    },
    localhost: {
      chainId: 1337,
      url: "http://127.0.0.1:8545",
    }
  }
}

export default config;
