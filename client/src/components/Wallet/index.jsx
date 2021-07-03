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
    if (wallet) {
      localStorage.setItem("Wallet", wallet);

      getBalance();
      const interval = setInterval(() => {
        getBalance();
      }, 30000);
      return () => clearInterval(interval);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  const getBalance = async () => {
    const currentBalance = await walletInfo(parsedWallet.cashAddress);
    console.log(currentBalance);
    const tokenBalance = currentBalance.tokens;
    setBalance(currentBalance.balance);
  };

  const createNewWallet = async () => {
    const newWallet = await createWallet();
    setWallet(JSON.stringify(newWallet));
  };

  const restoreExistingWallet = async (seed) => {
    const existingWallet = await restoreWallet(seed);
    console.log(existingWallet);
    setWallet(JSON.stringify(existingWallet));
  };

  const clearStorage = () => {
    localStorage.removeItem("Wallet");
    setWallet(false);
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
          <RestoreWallet onSubmit={(seed) => restoreExistingWallet(seed)} />
        </>
      )}
    </div>
  );
};

export default Wallet;
