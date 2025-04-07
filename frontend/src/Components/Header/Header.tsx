import React from "react";
import { useContract } from "../../services/contractProvider";
import styles from "./Header.module.scss";


export default function Header() {
  const data = useContract();
  if (data) {
    return <>
      <header className={styles.header}>
        <div>
          <h2>{data.contractJSON?.name} blockchain</h2>
          <h3>{data.contractJSON?.address}</h3>
        </div>
        <div>
          <h3>Symbol: {data.contractJSON?.symbol}</h3>
          <h3>Total Supply: {data.contractJSON?.totalSupply} {data.contractJSON?.symbol + 's'}</h3>
        </div>
      </header>
    </>
  } else {
    return <>
      <h1>Sorry no contract found</h1>
    </>
  }
}