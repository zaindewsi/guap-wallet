import { useState } from "react";

const Send = (props) => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0);

  const click = (event) => {
    event.preventDefault();
    if (address.includes("bitcoincash:") && amount > 0) {
      props.onSubmit(address, Number(amount));
    } else {
      console.log("ADDRESS MUST BEGIN WITH BITCOINCASH:");
      console.log("AMOUNT MUST BE GREATER THAN 0");
    }
    setAddress("");
    setAmount(0);
  };

  return (
    <div className="send">
      <h1>Send BCH</h1>
      <form>
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        <input
          type="number"
          placeholder="amount in BCH"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <button type="submit" onClick={click}>
          Submit
        </button>
      </form>
      <h1>Send SLP</h1>
      <form>
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        <input
          type="number"
          placeholder="amount in BCH"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <button type="submit" onClick={click}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Send;
