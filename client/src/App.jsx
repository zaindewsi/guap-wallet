import "./App.css";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import Body from "./components/Body";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <NavBar />

        <SideBar />
        <Body />
      </Router>
    </>
  );
}

export default App;
