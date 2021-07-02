import NewWallet from "./NewWallet";
import RestoreWallet from "./RestoreWallet";
import Send from "./Send";
import Balance from "./Balance";
import Receive from "./Receive";
import { useEffect, useState } from "react";
import { createWallet } from "../../helpers/BCH/createWallet";

import "./Wallet.scss";

const Wallet = () => {
  const [wallet, setWallet] = useState(localStorage.getItem("Wallet"));

  useEffect(() => {
    wallet && localStorage.setItem("Wallet", wallet);
  }, [wallet]);

  const createNewWallet = async () => {
    const newWallet = await createWallet();
    setWallet(JSON.stringify(newWallet));
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
          <Balance />
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
