/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ethers } from "ethers";
import { useState } from "react";

export default function Transfer() {
  const [tx, setTx] = useState<object | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    defaultValues: {
      from: "0x195ccf174831a100dc88af9c02f649bdb8637a33",
      to: "0x0EDBb5E5810C0737fd41740C99F445b59003A3d1",
      amount: "1",
    },
  });
  const onSubmit = async (data: any) => {
    setLoading(true);
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(data.from);
    const t = await signer.sendTransaction({
      to: data.to,
      value: ethers.parseEther(data.amount.toString()),
    });
    const tx = await t.wait();
    setTx({ tx, t, data });
    setLoading(false);
  };
  return (
    <div>
      <h1 className="text-xl font-bold">Transfer</h1>
      <p>Transfer you money here</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cuenta de origen</FormLabel>
                <FormControl>
                  <Input placeholder="0X3d5475d" {...field} />
                </FormControl>
                <FormDescription>Origen de la transacción</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cuenta de destino</FormLabel>
                <FormControl>
                  <Input placeholder="0X3d5475d" {...field} />
                </FormControl>
                <FormDescription>Destino de la transacción</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad</FormLabel>
                <FormControl>
                  <Input placeholder="0X3d5475d" {...field} />
                </FormControl>
                <FormDescription>Cantidad</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {loading && "Transfiriendo..."}
            {!loading && "Transfer"}
          </Button>
        </form>
      </Form>
      {tx && (
        <div>
          <h2>Transacción realizada</h2>
          <pre>{JSON.stringify(tx, null, 4)}</pre>
        </div>
      )}
    </div>
  );
}
