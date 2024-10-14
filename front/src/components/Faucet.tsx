import { UserContext } from "@/App";
import { useContext, useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export default function Faucet() {
  const { state, setState } = useContext(UserContext);
  const [tx, setTx] = useState<object | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleClick() {
    setLoading(true);
    const result = await fetch(
      `http://localhost:3333/api/faucet/${state.acc}/1`
    );
    const data = await result.json();
    setTx(data);
    setLoading(false);
  }

  return (
    <div className="mt-5 space-y-4">
      <h1 className="text-3xl font-bold">Faucet</h1>
      <p>Cuenta: {state.acc}</p>
      <Button onClick={async () => handleClick()}>
        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        Solicitar fondos
      </Button>
      {tx && <pre>Transacción: {JSON.stringify(tx, null, 4)}</pre>}
    </div>
  );
}
