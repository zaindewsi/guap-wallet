import Logo from "../images/guap.png";
import "./NavBar.scss";
import { BiCog } from "react-icons/bi";

const NavBar = () => {
  const handleClick = () => {
    console.log("button clicked");
  };

  return (
    <header className="navbar">
      <img src={Logo} className="logo" alt="guap" />
      <button onClick={handleClick} className="settings-button">
        <BiCog className="settings-icon" />
      </button>
    </header>
  );
};

export default NavBar;
