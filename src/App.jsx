import "./darkMode.scss";
//import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import Body from "./components/Body";
import { BrowserRouter as Router } from "react-router-dom";
import { AppWrapper } from "../src/hooks/AppContext";

function App(props) {
  return (
    <AppWrapper>
      <Router>
        <NavBar />

        {props.sidebar()}
        <Body />
      </Router>
    </AppWrapper>
  );
}

export default App;
