import "./Body.scss";
import { Switch, Route, Redirect } from "react-router-dom";
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
      <Switch>
        <Route exact path="/">
          <Redirect to="/wallet" />
        </Route>
        <Route path="/wallet">
          <Wallet varBalance={varBalance} setVarBalance={setVarBalance}/>
        </Route>
        <Route exact path="/coins">
          <CoinTable varBalance={varBalance} setVarBalance={setVarBalance}/>
        </Route>
        <Route path="/coins/:id">
          <Coin varBalance={varBalance} setVarBalance={setVarBalance}/>
        </Route>
        <Route path="/about">
          <AboutUs />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/watchlist">
          <Watchlist varBalance={varBalance} setVarBalance={setVarBalance}/>
        </Route>
      </Switch>
    </div>
  );
};

export default Body;
