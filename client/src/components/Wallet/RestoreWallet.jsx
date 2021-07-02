export default function RestoreWallet() {
  return (
    <div className="add-wallet">
      <h2> Already have a wallet? </h2>
      <h2> Import it here: </h2>
      <input className="seed-input" placeholder="enter your seed phrase" />
      <br />
      <button> IMPORT </button>
    </div>
  );
}
