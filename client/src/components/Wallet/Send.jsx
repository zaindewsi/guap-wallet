import { useState } from "react";

const Send = (props) => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [slpToken, setSlpToken] = useState("");
  const [tokenID, setTokenID] = useState("");

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

  return (
    <div className="send">
      {!props.toggle ? (
        <>
          <h1>Send BCH</h1>
          <form>
            <input
              type="text"
              placeholder="bitcoincash:"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
            <input
              type="number"
              placeholder="amount in BCH"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
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
            <input
              type="text"
              placeholder="simpleledger:"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
            <select
              name="token"
              value={slpToken}
              onChange={(event) => {
                console.log("id", event.target[event.target.selectedIndex].id);
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
