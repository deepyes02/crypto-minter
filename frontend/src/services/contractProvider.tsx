import React, { createContext, useContext, useState, useEffect } from 'react'
import contractData from '../contract.json'
import {ethers, Contract, BrowserProvider} from 'ethers'


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
          const rpcProvider = new ethers.JsonRpcProvider('http://127.0.0.1:8545')
          const accounts = await web3Provider.listAccounts();
          // console.log(extendedContractData);
          if(!accounts.length) {
            await web3Provider.send("eth_requestAccounts", []);
          }
          const signer = await web3Provider.getSigner();
          const readContract = new Contract(extendedContractData.address, extendedContractData.abi, rpcProvider);


          extendedContractData.name = await readContract.name();;
          extendedContractData.symbol = await readContract.symbol();
          extendedContractData.totalSupply = (await readContract.totalSupply()).toString();
          
          setContractJSON(extendedContractData);
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

