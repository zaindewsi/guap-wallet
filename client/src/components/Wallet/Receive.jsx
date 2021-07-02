import { FaWallet } from "react-icons/fa";
import QRCode from "qrcode.react";
import Switch from "react-switch";
import { useState } from "react";

const Receive = (props) => {
  const [toggle, setToggle] = useState(false);

  const handleChange = (checked) => {
    toggle ? setToggle(false) : setToggle(true);
  };

  return (
    <div className="receive">
      <h1>
        <FaWallet />
        Receive
      </h1>
      <QRCode value={toggle ? props.slpAddress : props.cashAddress} />
      <p>{toggle ? props.slpAddress : props.cashAddress}</p>
      <Switch
        checked={toggle}
        onChange={handleChange}
        onColor="#7ED957"
        offColor="#5664D2"
        onHandleColor="#5664D2"
        offHandleColor="#7ED957"
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        handleDiameter={30}
        uncheckedIcon={false}
        checkedIcon={false}
        height={20}
        width={48}
        className="react-switch"
        id="material-switch"
      />
    </div>
  );
};

export default Receive;
