import React from "react";
import { useContract } from "../../services/contractProvider";
import styles from "./Header.module.scss";


export default function Header() {
  const contract = useContract();

  React.useEffect(() => {
    console.log('Header contract', contract);
  }, [contract]);

  if (contract) {
    return <>
      <header className={styles.header}>
        <h1>Blockchain</h1>
        <h3>{contract.contract?.address}</h3>
      </header>
    </>
  } else {
    return <>
      <h1>Sorry no contract found</h1>
    </>
  }
}