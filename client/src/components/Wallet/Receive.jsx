import { FaWallet } from "react-icons/fa";
import QRCode from "qrcode.react";

const Receive = (props) => {
  return (
    <div className="receive">
      <h1>
        <FaWallet />
        Receive
      </h1>
      <QRCode value={props.toggle ? props.slpAddress : props.cashAddress} />
      <p>{props.toggle ? props.slpAddress : props.cashAddress}</p>
    </div>
  );
};

export default Receive;
