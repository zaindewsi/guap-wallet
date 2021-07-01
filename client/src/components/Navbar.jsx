import "./Navbar.scss";
import Logo from "../images/guap.png"

export default function Navbar(props) {
  
  return (
<header className="navbar">
    <img src={Logo} className="logo" alt="guap"/>
</header>
  );
}