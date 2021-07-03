import NewWallet from "./NewWallet";
import RestoreWallet from "./RestoreWallet";
import Send from "./Send";
import Balance from "./Balance";
import Receive from "./Receive";
import { useEffect, useState } from "react";
import { createWallet } from "../../helpers/BCH/createWallet";
import { walletInfo } from "../../helpers/BCH/walletInfo";
import { restoreWallet } from "../../helpers/BCH/restoreWallet";

import "./Wallet.scss";

const Wallet = () => {
  const [wallet, setWallet] = useState(localStorage.getItem("Wallet"));
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    wallet && localStorage.setItem("Wallet", wallet);
  }, [wallet]);

  useEffect(() => {
    const interval = setInterval(() => {
      getBalance();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const createNewWallet = async () => {
    const newWallet = await createWallet();
    setWallet(JSON.stringify(newWallet));
  };

  const clearStorage = () => {
    localStorage.removeItem("Wallet");
    setWallet(false);
  };

  const getBalance = async () => {
    const currentBalance = await walletInfo(parsedWallet.cashAddress);
    const totalBalance =
      currentBalance.balance.confirmed + currentBalance.balance.unconfirmed;
    setBalance(totalBalance);
  };

  const parsedWallet = JSON.parse(wallet);

  return (
    <div className="wallet">
      {wallet ? (
        <>
          <Balance bal={balance} />
          <div className="transfer">
            <Receive
              cashAddress={parsedWallet.cashAddress}
              slpAddress={parsedWallet.slpAddress}
            />
            <Send />
          </div>
          <button onClick={clearStorage}>Clear </button>
        </>
      ) : (
        <>
          <NewWallet onClick={createNewWallet} />
          <RestoreWallet />
        </>
      )}
    </div>
  );
};

export default Wallet;
