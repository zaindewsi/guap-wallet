import "./darkMode.scss";
//import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import Body from "./components/Body";
import { BrowserRouter as Router } from "react-router-dom";

function App(props) {
  return (
    <>
      <Router>
        <NavBar />

        {props.sidebar()}
        <Body />
      </Router>
    </>
  );
}

export default App;
