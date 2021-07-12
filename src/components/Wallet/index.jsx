import NewWallet from "./NewWallet";
import RestoreWallet from "./RestoreWallet";
import ExplorerLink from "./ExplorerLink";
import Send from "./Send";
import Balance from "./Balance";
import Receive from "./Receive";
import SlpWallet from "minimal-slp-wallet";
import { useEffect, useState } from "react";
import "./Wallet.scss";
import CoinGecko from "coingecko-api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCopy } from "react-icons/fa";

const Wallet = ({varBalance, setVarBalance}) => {
  const [wallet, setWallet] = useState(localStorage.getItem("Wallet"));
  const [balance, setBalance] = useState(0);
  const [popupWalletState, setPopupWalletState] = useState("");
  const [cadBalance, setCadBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [totalTokens, setTotalTokens] = useState(0);
  const [listOfTokens, setListOfTokens] = useState({});
  const [popup, setPopup] = useState(true);
  const [newSeed, setNewSeed] = useState("");

  const CoinGeckoClient = new CoinGecko();

  const handleChange = (checked) => {
    toggle ? setToggle(false) : setToggle(true);
  };

  useEffect(() => {
    newSeed && SeedPopup();
    if (wallet) {
      localStorage.setItem("Wallet", wallet);
      retrieveBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet, varBalance, newSeed, popup]);

  const parsedWallet = JSON.parse(wallet);

  const sendCoin = async (address, amount) => {
    const seed = parsedWallet.mnemonic;
    const slpWallet = await restoreExistingWallet(seed);
    const receivers = [
      {
        address,
        amountSat: amount,
      },
    ];
    const txid = await slpWallet.send(receivers);
    toast.dark(<ExplorerLink tx={txid} />);
    retrieveBalance();
  };

  const sendSlp = async (address, tokenId, tokenAmt) => {
    const seed = parsedWallet.mnemonic;
    const slpWallet = await restoreExistingWallet(seed);
    const receiver = {
      address,
      tokenId,
      qty: tokenAmt,
    };
    const txid = await slpWallet.sendTokens(receiver, 3.0);
    toast.dark(<ExplorerLink tx={txid} />);
    retrieveBalance();
  };

  const retrieveBalance = async () => {
    setLoading(true);

    const seed = parsedWallet.mnemonic;
    const slpWallet = await restoreExistingWallet(seed);
    const satoshis = await slpWallet.getBalance(slpWallet.walletInfo.address);
    const bchBalance = satoshis / 100000000;
    setBalance(bchBalance);

    let data = await CoinGeckoClient.simple.price({
      ids: ["bitcoin-cash"],
      vs_currencies: [varBalance],
    });

    const currency = (code) => data.data["bitcoin-cash"][code];

    setCadBalance(currency(varBalance) * bchBalance);

    const tokens = await slpWallet.listTokens();
    setTotalTokens(tokens.length);

    const tokenList = {};
    tokens.forEach((token) => {
      tokenList[token.tokenId] = {
        id: token.tokenId,
        name: token.name,
        value: token.qty,
      };
    });
    setListOfTokens(tokenList);
    setLoading(false);
  };

  const createNewWallet = async () => {
    setLoading(true);
    const options = {
      apiToken: process.env.REACT_APP_BCHJSTOKEN,
    };
    const slpWallet = new SlpWallet(undefined, options);
    await slpWallet.walletInfoPromise;
    const newInfo = await slpWallet.walletInfo.mnemonic;

    if (popup) {
      SeedPopup();
      setNewSeed(newInfo);
      setPopupWalletState(slpWallet.walletInfo);
    }
  };

  const closePopup = () => {
    setPopup(false);
    setWallet(JSON.stringify(popupWalletState));
  };

  const SeedPopup = () => {
    if (newSeed) {
      return (
        <>
          <div className="seed-box"></div>
          <div className="seed-popup">
            <h1>ATTENTION!</h1>
            <h2>
              Please, make sure you save this seed phrase in order to access
              your wallet in the furture!!!
            </h2>
            <div className="copy-seed">
              <h3 className="seed">
                {newSeed}{" "}
                <button onClick={() => copy()}>
                  <FaCopy />
                </button>{" "}
              </h3>
            </div>
            <button className="got-it" onClick={() => closePopup()}>
              GOT IT!
            </button>
          </div>
        </>
      );
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(newSeed);
  };

  const restoreExistingWallet = async (seed) => {
    setLoading(true);
    const options = {
      apiToken: process.env.REACT_APP_BCHJSTOKEN,
    };
    const slpWallet = new SlpWallet(seed, options);
    await slpWallet.walletInfoPromise;
    setWallet(JSON.stringify(slpWallet.walletInfo));
    return slpWallet;
  };

  const DenomSelector = () => {
    return (
      <select
        className="select-denomination"
        value={varBalance}
        onChange={(event) => {
          setVarBalance(event.target.value);
        }}
        disabled={loading ? true : false}
      >
        <option>cad</option>
        <option>usd</option>
        <option>eur</option>
        <option>gbp</option>
        <option>aud</option>
        <option>chf</option>
      </select>
    );
  };

  return (
    <div className="wallet">
      <ToastContainer />
      {wallet ? (
        <>
          <Balance
            bal={balance}
            cadBalance={cadBalance}
            currency={varBalance}
            token={totalTokens}
            loading={loading}
            refresh={retrieveBalance}
            tokens={listOfTokens}
            toggle={toggle}
            handleChange={handleChange}
            denominations={DenomSelector()}
          />
          <div className="transfer">
            <Receive
              cashAddress={parsedWallet.cashAddress}
              slpAddress={parsedWallet.slpAddress}
              toggle={toggle}
            />
            <Send
              onBchSubmit={(recAddr, amount) => sendCoin(recAddr, amount)}
              onSlpSubmit={(address, tokenId, tokenAmt) =>
                sendSlp(address, tokenId, tokenAmt)
              }
              toggle={toggle}
              tokens={listOfTokens}
              denomination={varBalance}
              balance={balance}
            />
          </div>
        </>
      ) : (
        <>
          <NewWallet
            onClick={createNewWallet}
            loading={loading}
            popup={SeedPopup()}
            seed={newSeed}
          />
          <RestoreWallet
            onSubmit={(seed) => restoreExistingWallet(seed)}
            loading={loading}
          />
        </>
      )}
    </div>
  );
};

export default Wallet;
