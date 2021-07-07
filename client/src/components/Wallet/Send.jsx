import { useState, useEffect } from "react";
import QrReader from "react-qr-reader";
import { ImQrcode } from "react-icons/im";
import CoinGecko from "coingecko-api";

const Send = (props) => {
  const CoinGeckoClient = new CoinGecko();
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [slpToken, setSlpToken] = useState("");
  const [tokenID, setTokenID] = useState("");
  const [readQRBch, setReadQRBch] = useState("");
  const [qrBch, setQrBch] = useState(false);
  const [readQRSlp, setReadQRSlp] = useState("");
  const [qrSlp, setQrSlp] = useState(false);

  const [isSatoshi, setIsSatoshi] = useState(true);

  const bchClick = (event) => {
    event.preventDefault();
    if (address.includes("bitcoincash:") && amount > 0) {
      props.onBchSubmit(address, Number(amount));
    } else {
      console.log("ADDRESS MUST BEGIN WITH BITCOINCASH:");
      console.log("AMOUNT MUST BE GREATER THAN 0");
    }
    setAddress("");
    setAmount(0);
  };

  const slpClick = (event) => {
    event.preventDefault();
    if (address.includes("simpleledger:") && amount > 0) {
      props.onSlpSubmit(address, tokenID, Number(amount));
    } else {
      console.log("ADDRESS MUST BEGIN WITH simpleledger:");
      console.log("AMOUNT MUST BE GREATER THAN 0");
    }
    setAddress("");
    setAmount(0);
  };

  const TokenList = () => {
    const tokenIds = Object.keys(props.tokens);

    const list = tokenIds.map((token) => {
      return (
        <option key={token} id={token}>
          {props.tokens[token].name}
        </option>
      );
    });
    return list;
  };

  const qrClickBch = () => {
    !qrBch ? setQrBch(true) : setQrBch(false);
  };
  const qrClickSlp = () => {
    !qrSlp ? setQrSlp(true) : setQrSlp(false);
  };

  const clearBch = () => {
    setAddress("");
    setReadQRBch("");
  };
  const clearSlp = () => {
    setAddress("");
    setReadQRSlp("");
  };

  const convertFiat = async (e) => {
    setAmount(e.target.value);

    let data = await CoinGeckoClient.simple.price({
      ids: ["bitcoin-cash"],
      vs_currencies: [props.denomination],
    });

    const convertedFiat = (
      e.target.value / data.data["bitcoin-cash"][props.denomination]
    ).toFixed(8);

    setConvertedAmount(convertedFiat);
  };

  const convertToFiat = async (e) => {
    setAmount(e.target.value);

    let data = await CoinGeckoClient.simple.price({
      ids: ["bitcoin-cash"],
      vs_currencies: [props.denomination],
    });

    const convertedFiat =
      e.target.value * data.data["bitcoin-cash"][props.denomination];

    setConvertedAmount(convertedFiat);
  };

  return (
    <div className="send">
      {!props.toggle ? (
        <>
          <h1>Send BCH</h1>
          <form>
            <div style={{ display: "flex" }}>
              <input
                type="text"
                placeholder="bitcoincash:"
                value={readQRBch ? readQRBch : address}
                onChange={(event) => {
                  !readQRBch
                    ? setAddress(event.target.value)
                    : setAddress(readQRBch);
                }}
              />
              <button type="button" onClick={qrClickBch}>
                <ImQrcode />
              </button>
              <button type="button" onClick={clearBch}>
                Clear
              </button>
            </div>
            {qrBch && (
              <>
                <QrReader
                  delay={300}
                  onError={(err) => {
                    console.error(err);
                  }}
                  onScan={(data) => {
                    if (data) {
                      setReadQRBch(data);
                      setQrBch(false);
                    }
                  }}
                  style={{ width: "100%" }}
                />
              </>
            )}
            <input
              type="number"
              placeholder={isSatoshi ? "amount in Satoshis" : "amount in BCH"}
              value={convertedAmount}
              onChange={(event) => convertToFiat(event)}
            />
            {isSatoshi ? (
              <button type="button" onClick={() => setIsSatoshi(false)}>
                Satoshi
              </button>
            ) : (
              <button type="button" onClick={() => setIsSatoshi(true)}>
                BCH
              </button>
            )}
            OR
            <input
              type="number"
              placeholder={`Amount in ${props.denomination.toUpperCase()}`}
              value={amount}
              onChange={(event) => convertFiat(event)}
            />
            <button type="submit" onClick={bchClick}>
              Submit
            </button>
          </form>
        </>
      ) : (
        <>
          <h1>Send SLP</h1>
          <form>
            <div style={{ display: "flex" }}>
              <input
                type="text"
                placeholder="simpleledger:"
                value={readQRSlp ? readQRSlp : address}
                onChange={(event) => {
                  !readQRSlp
                    ? setAddress(event.target.value)
                    : setAddress(readQRSlp);
                }}
              />
              <button type="button" onClick={qrClickSlp}>
                <ImQrcode />
              </button>
              <button type="button" onClick={clearSlp}>
                Clear
              </button>
            </div>
            {qrSlp && (
              <>
                <QrReader
                  delay={300}
                  onError={(err) => {
                    console.error(err);
                  }}
                  onScan={(data) => {
                    if (data) {
                      setReadQRSlp(data);
                      setQrSlp(false);
                    }
                  }}
                  style={{ width: "100%" }}
                />
              </>
            )}
            <select
              name="token"
              value={slpToken}
              onChange={(event) => {
                setTokenID(event.target[event.target.selectedIndex].id);
                setSlpToken(event.target.value);
              }}
            >
              <option disabled>please select token</option>
              <TokenList />
            </select>

            <input
              type="number"
              placeholder="amount of tokens"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
            <button type="submit" onClick={slpClick}>
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Send;
