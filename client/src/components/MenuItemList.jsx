import { Link } from "react-router-dom";
import { FaWallet, FaCoins, FaHandPeace, FaStar } from "react-icons/fa";
import "./MenuItemList.scss";

export default function MenuItemList() {
  return (
    <>
      <Link to="/wallet" style={{ textDecoration: 'none' }}>
        <div className="menu-item">
          <FaWallet className="menu-item-icon" />
          <h1 className="menu-item-title">Wallet</h1>
        </div>
      </Link>
      <Link to="/coins" style={{ textDecoration: 'none' }}>
        <div className="menu-item">
          <FaCoins className="menu-item-icon" />
          <h1 className="menu-item-title">Coins</h1>
        </div>
      </Link>
      <Link to="/watchlist" style={{ textDecoration: 'none' }}>
        <div className="menu-item">
          <FaStar className="menu-item-icon" />
          <h1 className="menu-item-title">Watchlist</h1>
        </div>
      </Link>
      <Link to="/about" style={{ textDecoration: 'none' }}>
        <div className="menu-item">
          <FaHandPeace className="menu-item-icon" />
          <h1 className="menu-item-title">About Us</h1>
        </div>
      </Link>

    </>
  );
}
