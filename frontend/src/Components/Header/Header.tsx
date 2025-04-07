import React from "react";
import { useContract } from "../../services/contractProvider";


export default function Header() {
  const contract = useContract();

  React.useEffect(() => {
    console.log('Header contract', contract);
  }, [contract]);

  if (contract) {
    return <>
      <header>
        <h1>Blockchain</h1>
      </header>
      <main>
        <h3>{contract.contract?.address}</h3>
      </main>
    </>
  } else {
    return <>
    <h1>Sorry no contract found</h1>
    </>
  }
}