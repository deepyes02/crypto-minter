import React, { createContext, useContext, useState, useEffect } from 'react'
import contractData from '../contract.json'
import { ethers } from 'ethers';

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
  const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545')
  const contractAddress = extendedContractData.address;
  const contractABI = extendedContractData.abi;
  const contract = new ethers.Contract(contractAddress, contractABI, provider);
  useEffect(() => {
    async function getName() {
      try {
        const name = await contract.name();
        const symbol = await contract.symbol();
        const totalSupply = await contract.totalSupply();

        extendedContractData.name = name;
        extendedContractData.symbol = symbol;
        extendedContractData.totalSupply = totalSupply.toString();
        setContractJSON(extendedContractData);
      }
      catch (error) {
        console.error("Error fetching contract data:", error);
        setContractJSON(null);
      }
    }

    getName();


  }, [contractData])
  return (
    contractJSON ?
      <ContractContext.Provider value={{ contractJSON }}>
        {children}
      </ContractContext.Provider>
      :
      <h2>Sorry blockchain is not connected or smart contract not deployed, please check your code</h2>
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

