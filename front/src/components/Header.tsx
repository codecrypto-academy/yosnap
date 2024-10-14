/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useContext, useEffect } from "react";
import { UserContext } from "@/App";

export default function Header() {
  const { state, setState } = useContext(UserContext);

  useEffect(() => {
    const ethereum = (window as any).ethereum;
    if (ethereum == null) {
      alert("Instalar metamask");
      return;
    }
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts: string[]) => {
        setState({ acc: accounts[0] });
      });
    ethereum.on("accountsChanged", (acc: string[]) => {
      setState({ acc: acc[0] });
    });
  }, [setState]);

  return (
    <div>
      <nav className="flex justify-center gap-3 pt-4">
        <Link to="Home">
          <Button>Home</Button>
        </Link>
        <Link to="Faucet">
          <Button>Faucet</Button>
        </Link>
        <Link to="Balance">
          <Button>Balance</Button>
        </Link>
        <Link to="Transfer">
          <Button>Transferir</Button>
        </Link>
        <div className="flex justify-center gap-2 pt-4">
          {state.acc ? (
            <p className="text-lg font-bold text-center border-2">
              {state.acc}
            </p>
          ) : (
            <div>Seleccione una cuenta</div>
          )}
        </div>
      </nav>
    </div>
  );
}
