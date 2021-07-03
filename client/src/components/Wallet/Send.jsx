const Send = () => {
  return (
    <div className="send">
      <h1>Send</h1>
      <form>
        <input type="text" placeholder="address" />
        <input type="text" placeholder="amount in BCH" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Send;
