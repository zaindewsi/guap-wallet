const NewWallet = (props) => {
  return (
    <div className="add-wallet">
      <h2> New Wallet </h2>
      <h2> Create new wallet: </h2>

      <button onClick={props.onClick}>CREATE</button>
    </div>
  );
};

export default NewWallet;
