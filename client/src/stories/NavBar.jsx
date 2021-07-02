import React from "react";
import Logo from "./assets/guap.png";
import "./NavBar.scss";

export const NavBar = () => (
  <header className="navbar">
    <img src={Logo} className="logo" alt="guap" />
  </header>
);
