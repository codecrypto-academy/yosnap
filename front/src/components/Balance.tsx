/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserContext } from "@/App";
import { useContext, useEffect, useState } from "react";

export default function Balance() {
  const { state, setState } = useContext(UserContext);
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const ethereum = (window as any).ethereum;
    if (ethereum == null) {
      alert("Instalar metamask");
      return;
    }
    ethereum
      .request({ method: "eth_getBalance", params: [state.acc] })
      .then((balance: string) => {
        setBalance(Number(balance) / 10 ** 18);
      });
  }, [state.acc]);

  return (
    <div>
      <h1>balance</h1>
      <p>
        el address {state.acc} tiene balance: {balance}{" "}
      </p>
    </div>
  );
}
