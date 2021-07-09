import NewWallet from "./NewWallet";
import RestoreWallet from "./RestoreWallet";
import Send from "./Send";
import Balance from "./Balance";
import Receive from "./Receive";
import SlpWallet from "minimal-slp-wallet";
import { useEffect, useState } from "react";
import "./Wallet.scss";
import CoinGecko from "coingecko-api";

const Wallet = () => {
  const [wallet, setWallet] = useState(localStorage.getItem("Wallet"));
  const [balance, setBalance] = useState(0);

  const [varBalance, setVarBalance] = useState("cad");

  const [cadBalance, setCadBalance] = useState(0);

  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [totalTokens, setTotalTokens] = useState(0);
  const [listOfTokens, setListOfTokens] = useState({});

  const CoinGeckoClient = new CoinGecko();

  const handleChange = (checked) => {
    toggle ? setToggle(false) : setToggle(true);
  };

  useEffect(() => {
    if (wallet) {
      localStorage.setItem("Wallet", wallet);
      retrieveBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet, varBalance]);

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
    alert(`https://explorer.bitcoin.com/bch/tx/${txid}`);
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
    alert(`https://explorer.bitcoin.com/bch/tx/${txid}`);
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
    setWallet(JSON.stringify(slpWallet.walletInfo));
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
          <NewWallet onClick={createNewWallet} loading={loading} />
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
