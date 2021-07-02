import NewWallet from "./NewWallet";
import RestoreWallet from "./RestoreWallet";
import Send from "./Send";
import Balance from "./Balance";
import Receive from "./Receive";
import { useEffect, useState } from "react";

import "./Wallet.scss";

const Wallet = () => {
  const [wallet, setWallet] = useState(false);

  useEffect(() => {
    console.log(localStorage.getItem("Wallet"));

    if (localStorage.getItem("Wallet") === "[object Object]") {
      setWallet(true);
    }
  }, [wallet]);

  return (
    <div className="wallet">
      {wallet ? (
        <>
          <Balance />
          <div className="transfer">
            <Receive
              cashAddress={
                "bitcoincash:qqjettkgjzhxmwjxm6kduxej7w26p5gr4gaucp6yrq"
              }
              slpAddress={
                "simpleledger:qqjettkgjzhxmwjxm6kduxej7w26p5gr4g38n60ya7"
              }
            />
            <Send />
          </div>
        </>
      ) : (
        <>
          <NewWallet />
          <RestoreWallet />
        </>
      )}
    </div>
  );
};

export default Wallet;
