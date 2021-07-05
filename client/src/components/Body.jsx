import "./Body.scss";
import Wallet from "./Wallet";
import { Switch, Route } from "react-router-dom";
import CoinTable from "./Coins/CoinTable";

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
        <Route exact path="/about">
          <h1> About </h1>
        </Route>
      </Switch>
    </div>
  );
};

export default Body;
