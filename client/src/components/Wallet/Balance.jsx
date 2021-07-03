export default function Balance(props) {
  const num = props.cadBalance;
  let dollars = num / 100;
  dollars = dollars.toLocaleString("en-US", {
    style: "currency",
    currency: "CAD",
  });
  return (
    <div className="balance">
      <h1> BALANCE </h1>
      <h2>
        BCH:
        <span> {props.bal} </span>
      </h2>
      <h2>
        <span> {dollars} </span>
      </h2>
    </div>
  );
}
