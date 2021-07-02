export default function Balance() {
  const balanceBCH = 0.5454;
  const balanceCAD = 446.44;

  return (
    <div class="balance">
      <h1> BALANCE </h1>
      <h2>
        BCH:
        <span> {balanceBCH} </span>
      </h2>
      <h2>
        CAD:
        <span> {balanceCAD} </span>
      </h2>
    </div>
  );
}
