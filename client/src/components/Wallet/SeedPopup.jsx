const SeedPopup = (props) => {
  if (props.seed) {
    return (
      <div className="token-box">
        <h1>Seed</h1>
        <p>{props.seed}</p>
      </div>
    );
  }
};

export default SeedPopup;
