import "./Settings.scss"
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";


export default function Settings () {
  const [wallet, setWallet] = useState(true)
  const [hiddenSeed, setHiddenSeed] = useState(true)
  const [hiddenKey, setHiddenKey] = useState(true)
  const parsedWallet = JSON.parse(localStorage.getItem("Wallet"));
  
  const clearStorage = () => {
    localStorage.removeItem("Wallet");
    setWallet(false);
  };

  const hideSeed = () => {
    hiddenSeed ? setHiddenSeed(false) : setHiddenSeed(true);
  }

  const hideKey = () => {
    hiddenKey ? setHiddenKey(false) : setHiddenKey(true);
  }
  return (
    <div className="settings">
    <h1>Settings</h1>
      {wallet ? (
      <div className="wallet-info">
          <div className="wallet-line">
            <strong>SEED</strong> 
            { !hiddenSeed ? (
            <>
            <span>
            <button onClick={hideSeed} className="eye"><AiOutlineEye /></button>
            </span>
            <div>
              {parsedWallet.mnemonic}
            </div>
            </>
            ) : (
              <>
            <button onClick={hideSeed} className="eye"><AiOutlineEyeInvisible /></button>
              <div>
              ***** ***** ***** ***** ***** ***** ***** ***** ***** *****
            </div>
            </>
            )}
              </div>
          <div className="wallet-line">
            <strong>PRIVATE KEY</strong> 
            { !hiddenKey ? (
            <>
            <span>
            <button onClick={hideKey} className="eye"><AiOutlineEye /></button>
            </span>
            <div>
              {parsedWallet.privateKey}
            </div>
            </>
            ) : (
              <>
            <button onClick={hideKey} className="eye"><AiOutlineEyeInvisible /></button>
              <div>
              **************************************************
            </div>
            </>
            )}
              </div>
          <div className="wallet-line"><strong>BCH ADDRESS</strong><div>{parsedWallet.address}</div></div>
          <div className="wallet-line"><strong>SLP ADDRESS</strong><div>{parsedWallet.slpAddress}</div></div>
          <div className="wallet-line"><strong>LEGACY ADDRESS</strong> <div>{parsedWallet.legacyAddress}</div></div>
          <div className="wallet-line"><strong>PUBLIC KEY</strong> <div>{parsedWallet.publicKey}</div></div>
          <div className="wallet-line"><strong>HD PATH</strong> <div>{parsedWallet.hdPath}</div></div>
      </div>
      ) : (
        <div> NO WALLET </div>
      )
      }
      <button onClick={clearStorage}>Clear Wallet Data</button>
    </div>
  )
}