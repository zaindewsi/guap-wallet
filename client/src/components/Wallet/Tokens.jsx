import { useState } from "react";
export default function Tokens(props) {
  const [isTokens, setIsTokens] = useState(false);

  const TokenValues = () => {
    const tokenIds = Object.keys(props.tokens);
    const list = tokenIds.map((token) => {
      return (
        <>
          <center>
            <p key={token}>{props.tokens[token].value}</p>
          </center>
          <hr />
        </>
      );
    });

    return list;
  };

  const TokenNames = () => {
    const tokenIds = Object.keys(props.tokens);
    const list = tokenIds.map((token) => {
      return (
        <>
          <center>
            <p key={token}>{props.tokens[token].name}</p>
          </center>
          <hr />
        </>
      );
    });

    return list;
  };

  return (
    <>
      {isTokens && (
        <>
          <div className="tokens-box">
            <h1 className="close" onClick={() => setIsTokens(false)}>
              X
            </h1>
          </div>

          <div className="tokens-popup">
            <div className="names">
              <h2>Name </h2>
              <hr />
              <TokenNames />
            </div>
            <div className="amount">
              <h2>Amount </h2>
              <hr />
              <TokenValues />
            </div>
          </div>
        </>
      )}
      <div>
        {Object.keys(props.tokens).length !== 0 && (
          <button type="button" onClick={() => setIsTokens(true)}>
            show tokens
          </button>
        )}
      </div>
    </>
  );
}
