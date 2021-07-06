import "./Body.scss";
import Wallet from "./Wallet";
import { Switch, Route } from "react-router-dom";
import CoinTable from "./Coins/CoinTable";
import Coin from "./Coins/Coin";

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
      </Switch>
    </div>
  );
};

export default Body;
