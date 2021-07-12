import Logo from "../images/guap.png";
import "./NavBar.scss";
import { BiCog } from "react-icons/bi";
import { Link } from "react-router-dom";

const NavBar = () => {


  return (
    <header className="navbar">
      <img src={Logo} className="logo" alt="guap" />
      <Link to="/settings">
      <button className="settings-button">
        <BiCog className="settings-icon" />
      </button>
      </Link>
    </header>
  );
};

export default NavBar;
