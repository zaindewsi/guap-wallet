import Logo from "./assets/guap.png";
import "./NavBar.scss";
import { BiCog } from "react-icons/bi";

export const NavBar = () => (
  <header className="navbar">
    <img src={Logo} className="logo" alt="guap" />
    <BiCog className="settings-icon" />
  </header>
);
