import { FaWallet, FaCopy } from "react-icons/fa";
import QRCode from "qrcode.react";

const Receive = (props) => {
  const copy = () => {
    if (props.toggle) {
      navigator.clipboard.writeText(props.slpAddress);
    } else {
      navigator.clipboard.writeText(props.cashAddress);
    }
  };

  return (
    <div className="receive">
      <h1>
        <FaWallet />
        Receive
      </h1>
      <QRCode
        className="qr-canvas"
        value={props.toggle ? props.slpAddress : props.cashAddress}
        includeMargin="true"
        size="150"
      />
      <button onClick={copy}>
        <FaCopy />
      </button>

      <p>{props.toggle ? props.slpAddress : props.cashAddress}</p>
    </div>
  );
};

export default Receive;
