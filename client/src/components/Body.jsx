import "./Body.scss";
import Wallet from "./Wallet";
import { Switch, Route } from "react-router-dom";
import CoinTable from "./Coins/CoinTable";
import Coin from "./Coins/Coin";
import Settings from "./Settings";
import Watchlist from "./../components/Watchlist.jsx";

const Body = () => {
  return (
    <div className="body">
      <Switch>
        <Route path="/wallet" exact>
          <Wallet />
        </Route>
        <Route exact path="/coins">
          <CoinTable />
        </Route>
        <Route exact path="/coins/:id">
          <Coin />
        </Route>
        <Route exact path="/about">
          <h1> About </h1>
        </Route>
        <Route exact path="/settings">
          <Settings />
        </Route>
        <Route exact path="/watchlist">
          <Watchlist />
        </Route>
      </Switch>
    </div>
  );
};

export default Body;
