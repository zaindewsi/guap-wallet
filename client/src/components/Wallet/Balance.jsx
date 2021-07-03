export default function Balance(props) {
  const balanceCAD = 446.44;

  return (
    <div className="balance">
      <h1> BALANCE </h1>
      <h2>
        BCH:
        <span> {props.bal} </span>
      </h2>
      <h2>
        CAD:
        <span> {balanceCAD} </span>
      </h2>
    </div>
  );
}
