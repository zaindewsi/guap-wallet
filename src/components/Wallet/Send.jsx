import { useState } from "react";
import QrReader from "react-qr-reader";
import { ImQrcode } from "react-icons/im";
import CoinGecko from "coingecko-api";

const Send = (props) => {
  const CoinGeckoClient = new CoinGecko();
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [convertFromFiat, setConvertFromFiat] = useState("");
  const [convertBch, setConvertBch] = useState("");
  const [slpToken, setSlpToken] = useState("");
  const [tokenID, setTokenID] = useState("");
  const [readQRBch, setReadQRBch] = useState("");
  const [qrBch, setQrBch] = useState(false);
  const [readQRSlp, setReadQRSlp] = useState("");
  const [qrSlp, setQrSlp] = useState(false);

  const [isFiat, setIsFiat] = useState(true);

  const bchClick = (event) => {
    event.preventDefault();

    const amountToSend = isFiat
      ? Number(convertFromFiat * 100000000).toFixed(0)
      : Number(amount * 100000000).toFixed(0);

    console.log(amountToSend);
    console.log(address);

    console.log("BALANCE", props.balance);

    if (
      address.includes("bitcoincash:") &&
      Number(amountToSend) > 0 &&
      amountToSend / 100000000 <= props.balance
    ) {
      props.onBchSubmit(address, Number(amountToSend));
    } else {
      console.log("ADDRESS MUST BEGIN WITH BITCOINCASH:");
      console.log("AMOUNT MUST BE GREATER THAN 0");
      console.log("AMOUNT MUST BE LESS THAN AMOUNT");
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

    setConvertFromFiat(convertedFiat);
  };

  const convertToFiat = async (e) => {
    setAmount(e.target.value);

    let data = await CoinGeckoClient.simple.price({
      ids: ["bitcoin-cash"],
      vs_currencies: [props.denomination],
    });

    const convertedToFiat = (
      data.data["bitcoin-cash"][props.denomination] * e.target.value
    ).toFixed(2);
    setConvertBch(convertedToFiat);
  };

  return (
    <div className="send">
      {!props.toggle ? (
        <>
          <h1>Send BCH 💸</h1>
          <form>
            <div style={{ display: "flex" }}>
              <input
                className="bch-address"
                type="text"
                placeholder="bitcoincash:"
                value={readQRBch ? readQRBch : address}
                onChange={(event) => {
                  !readQRBch
                    ? setAddress(event.target.value)
                    : setAddress(readQRBch);
                }}
              ></input>
              <button type="button" onClick={qrClickBch} className="qr-button">
                <ImQrcode />
              </button>
              <button type="button" onClick={clearBch} className="clear-button">
                CLEAR
              </button>
            </div>
            {qrBch && (
              <div className="scanner-background">
                <QrReader
                  className="scanner"
                  delay={200}
                  onError={(err) => {
                    console.error(err);
                  }}
                  onScan={(data) => {
                    if (data) {
                      setReadQRBch(data);
                      setAddress(data);
                      setQrBch(false);
                    }
                  }}
                />
                <h1 onClick={qrClickBch} className="scanner-close">
                  X
                </h1>
              </div>
            )}

            {isFiat ? (
              <>
                <h3>Amount in BCH: {convertFromFiat}</h3>
                <form className="send-from">
                  <div style={{ display: "flex" }}>
                    <input
                      type="number"
                      placeholder={`Amount in ${props.denomination.toUpperCase()}`}
                      value={amount}
                      onChange={(event) => convertFiat(event)}
                      className="fiat-input"
                    />
                    <button
                      type="button"
                      onClick={() => setIsFiat(false)}
                      className="denom-button"
                    >
                      FIAT
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h3>
                  Amount in {props.denomination.toUpperCase()}: {convertBch}
                </h3>
                <form>
                  <div style={{ display: "flex" }}>
                    <input
                      type="number"
                      placeholder="Amount in BCH"
                      value={amount}
                      onChange={(event) => convertToFiat(event)}
                    />
                    <button
                      type="button"
                      className="denom-button"
                      onClick={() => setIsFiat(true)}
                    >
                      BCH
                    </button>
                  </div>
                </form>
              </>
            )}

            <button type="submit" onClick={bchClick}>
              SEND
            </button>
          </form>
        </>
      ) : (
        <>
          <h1>Send SLP 💸</h1>
          <form className="slp-form">
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
              <button type="button" onClick={qrClickSlp} className="qr-button">
                <ImQrcode />
              </button>
              <button type="button" onClick={clearSlp} className="clear-button">
                CLEAR
              </button>
            </div>
            {qrSlp && (
              <div className="scanner-background">
                <QrReader
                  className="scanner"
                  delay={200}
                  onError={(err) => {
                    console.error(err);
                  }}
                  onScan={(data) => {
                    if (data) {
                      setReadQRSlp(data);
                      setQrSlp(false);
                    }
                  }}
                />
                <h1 onClick={qrClickSlp} className="scanner-close">
                  X
                </h1>
              </div>
            )}
            <br />
            <br />
            <br />
            <div style={{ display: "flex" }}>
              <input
                type="number"
                placeholder="Amount of tokens"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
              <select
                className="select-token"
                name="token"
                value={slpToken}
                onChange={(event) => {
                  setTokenID(event.target[event.target.selectedIndex].id);
                  setSlpToken(event.target.value);
                }}
              >
                <option selected="selected" disabled value="" hidden>
                  please select token
                </option>

                <TokenList />
              </select>
            </div>
            <button type="submit" onClick={slpClick}>
              SEND
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Send;
