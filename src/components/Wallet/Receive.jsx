import { FaCopy } from "react-icons/fa";
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
      <h1>Receive 💰</h1>
      <QRCode
        className="qr-canvas"
        value={props.toggle ? props.slpAddress : props.cashAddress}
        includeMargin={true}
        size={Number(150)}
      />

      <p>
        {props.toggle ? props.slpAddress : props.cashAddress}{" "}
        <button onClick={copy}>
          <FaCopy />
        </button>
      </p>
    </div>
  );
};

export default Receive;
