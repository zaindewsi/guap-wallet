import { FaWallet, FaCoins, FaHandPeace } from "react-icons/fa";
import "./MenuItemList.scss";

export default function MenuItemList() {
  return (
    <>
      <div className="menu-item">
        <FaWallet className="menu-item-icon" />
        <h1 className="menu-item-title">Wallet</h1>
      </div>
      <div className="menu-item">
        <FaCoins className="menu-item-icon" />
        <h1 className="menu-item-title">Coins</h1>
      </div>
      <div className="menu-item">
        <FaHandPeace className="menu-item-icon" />
        <h1 className="menu-item-title">About Us</h1>
      </div>
    </>
  );
}