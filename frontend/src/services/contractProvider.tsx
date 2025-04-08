import React, { createContext, useContext, useState, useEffect } from 'react'
import contractData from '../contract.json'
import {ethers, Contract, BrowserProvider} from 'ethers'
import { o } from 'react-router/dist/development/fog-of-war-oa9CGk10';


// Symbol is added to the extended contract data
interface ExtendedContractData {
  address: string;
  abi: string[];
  symbol?: string;
  name?: string;
  totalSupply?: number;
}

const extendedContractData: ExtendedContractData = { ...contractData };
const ContractContext = createContext<ContractContextType | undefined>(undefined)

export const ContractProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contractJSON, setContractJSON] = useState<any>(null)

  useEffect(() => {
    async function setup() {
      if (window.ethereum) {
        try {
          const web3Provider = new BrowserProvider(window.ethereum);
          const ownerPrivateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
          const rpcProvider = new ethers.JsonRpcProvider('http://127.0.0.1:8545')
          const ownerWallet = new ethers.Wallet(ownerPrivateKey, rpcProvider);
          const accounts = await web3Provider.listAccounts();
          console.log(accounts);
          if(!accounts.length) {
            await web3Provider.send("eth_requestAccounts", []);
          }

          const user = await web3Provider.getSigner();
          const userAddress = await user.getAddress();

          const readContract = new Contract(extendedContractData.address, extendedContractData.abi, rpcProvider);

         try{
          const writeContract = new Contract(extendedContractData.address, extendedContractData.abi, ownerWallet);
          const amount = ethers.parseUnits("100", 3);
          const tx = await writeContract.transfer(userAddress, amount);
          await tx.wait();

          const ownerBalance = await writeContract.balanceOf(ownerWallet.address);
          console.log("ownerBalance: ", ownerBalance.toString());

          const userBalance = await writeContract.balanceOf(userAddress);
          console.log("userBalance: ", userBalance.toString());
         } catch (error){
          console.log("Error in write contract: ", error);
         }
         
         


          extendedContractData.name = await readContract.name();;
          extendedContractData.symbol = await readContract.symbol();
          extendedContractData.totalSupply = (await readContract.totalSupply()).toString();
          
          setContractJSON(extendedContractData);

          if (window.ethereum) {
            try {
              await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                  type: 'ERC20',
                  options: {
                    address: extendedContractData.address,  // Token contract address
                    symbol: extendedContractData.symbol,    // Token symbol (e.g. SRI)
                    decimals: 3,                            // Token decimals (e.g. 3)
                  },
                },
              });
            } catch (error) {
              console.error('Error adding token to MetaMask:', error);
            }
          }
        }
        catch (error) {
          console.error("Error fetching contract data:", error);
          setContractJSON(null);
        }
      } else {
        alert("Please install MetaMask to use this app");
      }
    }
    setup();
  }, [contractData])
  return (
    contractJSON ?
      <ContractContext.Provider value={{ contractJSON }}>
        {children}
      </ContractContext.Provider>
      :
      <>
      <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer">Please install metamask</a>
      <h2>
      Sorry blockchain is not connected or smart contract not deployed, please check your code</h2>
      </>
  )
}
//custom hook to use the contract context in any component
export const useContract = () => {
  const context = useContext(ContractContext)
  if (!context) {
    throw new Error('useContract must be used within a ContractProvider')
  }
  return context
}

