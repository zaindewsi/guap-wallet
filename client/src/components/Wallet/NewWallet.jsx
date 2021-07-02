import { createWallet } from "../../helpers/BCH/createWallet";
import { useState, useEffect } from "react";

const NewWallet = (props) => {
  const [wallet, setWallet] = useState(localStorage.getItem("Wallet" || false));

  useEffect(() => {
    localStorage.setItem("Wallet", wallet);
  }, [wallet]);

  const click = async () => {
    const newWallet = await createWallet();
    setWallet(newWallet);
  };

  return (
    <div className="add-wallet">
      <h2> New Wallet </h2>
      <h2> Create new wallet: </h2>
      <p>{wallet && wallet.mnemonic}</p>
      <button onClick={click}>CREATE</button>
    </div>
  );
};

export default NewWallet;
