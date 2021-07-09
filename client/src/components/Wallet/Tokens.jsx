import { useState, useEffect } from "react";
export default function Tokens(props) {
  const [isTokens, setIsTokens] = useState(false);

  useEffect(() => {
    TokenList();
  }, [isTokens]);

  const TokenList = () => {
    const tokenIds = Object.keys(props.tokens);
    const list = tokenIds.map((token) => {
      return (
        <li key={token}>
          {props.tokens[token].name} :{props.tokens[token].value}
        </li>
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
            <ul>
              <TokenList />
            </ul>
          </div>
        </>
      )}
      <div>
      <button type="button" onClick={() => setIsTokens(true)}>
        show tokens
      </button>
      </div>
    </>
  );
}
