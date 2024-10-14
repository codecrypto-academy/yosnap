import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Transfer from "./components/Transfer";
import Home from "./components/Home";
import Balance from "./components/Balance";
import Faucet from "./components/Faucet";
import { createContext, useState } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      { path: "home", element: <Home /> },
      { path: "faucet", element: <Faucet /> },
      { path: "balance", element: <Balance /> },
      { path: "transfer", element: <Transfer /> },
    ],
  },
]);

export const UserContext = createContext({});

export default function App() {
  const [state, setState] = useState({
    acc: "zzzzz",
  });
  return (
    <UserContext.Provider value={{ state, setState }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}
