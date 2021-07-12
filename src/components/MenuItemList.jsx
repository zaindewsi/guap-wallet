import { Link, useLocation } from "react-router-dom";
import { FaWallet, FaCoins, FaHandPeace, FaStar } from "react-icons/fa";
import "./MenuItemList.scss";

import { useEffect, useState } from "react";

export default function MenuItemList() {
  const location = useLocation();
  const [selectedPath, setSelectedPath] = useState("/wallet");
  const handleRowClick = function () {
    setSelectedPath(location.pathname);
  };

  useEffect(() => {
    setSelectedPath(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Link to="/wallet" style={{ textDecoration: "none" }}>
        <div
          className={`menu-item ${selectedPath === "/wallet" && "active"}`}
          onClick={handleRowClick}
        >
          <FaWallet className="menu-item-icon" />
          <p className="menu-item-title">Wallet</p>
        </div>
      </Link>
      <Link to="/coins" style={{ textDecoration: "none" }}>
        <div
          className={`menu-item ${selectedPath.includes("/coins") && "active"}`}
          onClick={handleRowClick}
        >
          <FaCoins className="menu-item-icon" />
          <p className="menu-item-title">Coins</p>
        </div>
      </Link>
      <Link to="/watchlist" style={{ textDecoration: "none" }}>
        <div
          className={`menu-item ${selectedPath === "/watchlist" && "active"}`}
          onClick={handleRowClick}
        >
          <FaStar className="menu-item-icon" />
          <p className="menu-item-title">Watchlist</p>
        </div>
      </Link>
      <Link to="/about" style={{ textDecoration: "none" }}>
        <div
          className={`menu-item ${selectedPath === "/about" && "active"}`}
          onClick={handleRowClick}
        >
          <FaHandPeace className="menu-item-icon" />
          <p className="menu-item-title">About Us</p>
        </div>
      </Link>
    </>
  );
}
