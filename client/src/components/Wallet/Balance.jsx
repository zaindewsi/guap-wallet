import Status from "../../images/status.png";

export default function Balance(props) {
  const num = props.cadBalance;
  let dollars = num / 100;
  dollars = dollars.toLocaleString("en-US", {
    style: "currency",
    currency: "CAD",
  });

  const TokenList = () => {
    const list = props.tokenList.map((name) => {
      console.log(name);
      return <li key={name}>{name}</li>;
    });

    return list;
  };

  return (
    <div className="balance">
      <h1> BALANCE </h1>

      {props.loading ? (
        <img className="status-image" src={Status} alt="loading" />
      ) : (
        <>
          <h2>
            BCH:
            <span> {props.bal} </span>
          </h2>
          <h2>
            TOKENS:
            <span> {props.token} </span>
            <ul>
              <TokenList />
            </ul>
          </h2>
          <h2>
            <span> {dollars} </span>
          </h2>
        </>
      )}
      <div>
        <button onClick={props.refresh}>Check Balance</button>
      </div>
    </div>
  );
}
