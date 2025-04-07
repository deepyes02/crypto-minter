import React, {createContext, useContext, useState, useEffect} from 'react';
import contractData from '../contract.json';


const ContractContext = createContext<ContractContextType | undefined>(undefined);

export const ContractProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [contract, setContract] = useState<any>(null);

    useEffect(()=>{
      const contractInstance = contractData;
      setContract(contractInstance);
    }, [])

    return (
      <ContractContext.Provider value={{contract}}>
        {children}
      </ContractContext.Provider>
    )
}

//custom hook to use the contract context in any component
export const useContract = () => {
  const context = useContext(ContractContext);
  if(!context){
    throw new Error('useContract must be used within a ContractProvider');
  }
  return context;
}

