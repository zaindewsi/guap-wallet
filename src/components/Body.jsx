import "./Body.scss";
import Wallet from "./Wallet";
import { Switch, Route, Redirect } from "react-router-dom";
import CoinTable from "./Coins/CoinTable";
import Coin from "./Coins/Coin";
import Settings from "./Settings";
import AboutUs from "./AboutUs";
import Watchlist from "./Watchlist";

const Body = () => {
  return (
    <div className="body">
      <Switch>
        <Route exact path="/">
          <Redirect to="/wallet" />
        </Route>
        <Route path="/wallet">
          <Wallet />
        </Route>
        <Route exact path="/coins">
          <CoinTable />
        </Route>
        <Route path="/coins/:id">
          <Coin />
        </Route>
        <Route path="/about">
          <AboutUs />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/watchlist">
          <Watchlist />
        </Route>
      </Switch>
    </div>
  );
};

export default Body;
