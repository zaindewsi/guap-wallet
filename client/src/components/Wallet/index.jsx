import NewWallet from "./NewWallet";
import RestoreWallet from "./RestoreWallet";
import Send from "./Send";
import Balance from "./Balance";
import Receive from "./Receive";
import { useEffect, useState } from "react";
import { createWallet } from "../../helpers/BCH/createWallet";
import { walletInfo } from "../../helpers/BCH/walletInfo";
import { restoreWallet } from "../../helpers/BCH/restoreWallet";
import { sendBch } from "../../helpers/BCH/sendBch";
import { lookupToken } from "../../helpers/BCH/lookupToken";

import "./Wallet.scss";

const Wallet = () => {
  const [wallet, setWallet] = useState(localStorage.getItem("Wallet"));
  const [balance, setBalance] = useState(0);
  const [cadBalance, setCadBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tknBalance, setTknBalance] = useState(0);
  const [tknList, setTknList] = useState([]);

  useEffect(() => {
    if (wallet) {
      localStorage.setItem("Wallet", wallet);

      getBalance();
      const interval = setInterval(() => {
        getBalance();
      }, 60000);
      return () => clearInterval(interval);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  const sendCoin = (recAddr, amount) => {
    const cashAddr = parsedWallet.cashAddress;
    const seed = parsedWallet.mnemonic;
    sendBch(cashAddr, seed, recAddr, amount);
    getBalance();
  };

  
  const getBalance = async () => {
    const array = [];
    setLoading(true);
    const currentBalance = await walletInfo(parsedWallet.cashAddress);
    const tokenArr = currentBalance.tokens;
    const tokenBalance = tokenArr.length;

    setTknBalance(tokenBalance);

    tokenArr.forEach((token) => {
      lookupToken(token.tokenId).then((res) => {
        array.push(res)
        setTknList([...array]);
      });
    });

    

    const cadBalance = currentBalance.cadBalanceCents;
    setBalance(currentBalance.balance);
    setCadBalance(cadBalance);
    setLoading(false);
  };
  


  const createNewWallet = async () => {
    const newWallet = await createWallet();
    setWallet(JSON.stringify(newWallet));
  };

  const restoreExistingWallet = async (seed) => {
    const existingWallet = await restoreWallet(seed);
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
          <Balance
            bal={balance}
            cadBalance={cadBalance}
            token={tknBalance}
            loading={loading}
            refresh={getBalance}
            tokenList={tknList}
          />
          <div className="transfer">
            <Receive
              cashAddress={parsedWallet.cashAddress}
              slpAddress={parsedWallet.slpAddress}
            />
            <Send onSubmit={(recAddr, amount) => sendCoin(recAddr, amount)} />
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
