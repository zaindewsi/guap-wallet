import React from "react";
import SideBar from "../src/components/SideBar";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App sidebar={SideBar} />
  </React.StrictMode>,
  document.getElementById("root")
);
