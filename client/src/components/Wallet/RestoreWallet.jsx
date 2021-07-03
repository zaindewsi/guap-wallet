import { useState } from "react";

export default function RestoreWallet(props) {
  const [input, setInput] = useState("");

  const click = () => {
    const arr = input.split(" ");
    arr.length === 12
      ? props.onSubmit(input)
      : console.log("SEED PHRAsE MUST BE 12 WORDS");
    setInput("");
  };

  return (
    <div className="add-wallet">
      <h2> Already have a wallet? </h2>
      <h2> Import it here: </h2>

      <input
        className="seed-input"
        placeholder="enter your seed phrase"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <br />
      <button type="submit" onClick={click}>
        IMPORT
      </button>
    </div>
  );
}
