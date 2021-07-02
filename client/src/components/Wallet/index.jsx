import NewWallet from "./NewWallet";
import RestoreWallet from "./RestoreWallet";
import Send from "./Send";
import Balance from "./Balance";
import Receive from "./Receive";

import "./Wallet.scss";

const Wallet = () => {
  const wallet = true;
  return (
    <div className="wallet">
      {!wallet ? (
        <>
          <NewWallet />
          <RestoreWallet />
        </>
      ) : (
        <>
          <Balance />
          <div className="transfer">
            <Receive />
            <Send />
          </div>
        </>
      )}
    </div>
  );
};

export default Wallet;
