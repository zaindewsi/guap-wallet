import "./Body.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import Wallet from "./Wallet";
import CoinTable from "./Coins/CoinTable";
import Coin from "./Coins/Coin";
import Settings from "./Settings";
import AboutUs from "./AboutUs";
import Watchlist from "./Watchlist";

import usePrefCurrency from '../hooks/usePrefCurrency'

const Body = () => {
  const [varBalance, setVarBalance] = usePrefCurrency();
  return (
    <div className="body">
      <Routes>
        <Route exact path="/" element={<Navigate to="/wallet" />} />
        <Route path="/wallet" element={<Wallet varBalance={varBalance} setVarBalance={setVarBalance}/>}/>
        <Route exact path="/coins" element={<CoinTable varBalance={varBalance} setVarBalance={setVarBalance}/>}/>
        <Route path="/coins/:id" element={<Coin varBalance={varBalance} setVarBalance={setVarBalance}/>}/>
        <Route path="/about" element={<AboutUs />}/>
        <Route path="/settings" element={<Settings />}/>
        <Route path="/watchlist" element={<Watchlist varBalance={varBalance} setVarBalance={setVarBalance}/>} />
      </Routes>
    </div>
  );
};

export default Body;
