import "./Body.scss";
import Wallet from "./Wallet";
import { Switch, Route } from "react-router-dom";

const Body = () => {
  return (
    <div className="body">
      <Switch>
        <Route path="/wallet" exact>
          <Wallet />
        </Route>
        <Route exact path="/coins">
          <h1> Coins </h1>
        </Route>
        <Route exact path="/about">
          <h1> About </h1>
        </Route>
      </Switch>
    </div>
  );
};

export default Body;
