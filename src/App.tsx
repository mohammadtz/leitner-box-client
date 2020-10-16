import React from "react";
import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { Body } from "./Layouts/Landing/Body/Body";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const store = require("store");

function App(props: any) {
  store.set("lang", "fa");
  return (
    <React.Fragment>
      <Router>
        <div className="App" dir={store.get("lang") === "fa" ? "rtl" : "ltr"}>
          <Body />
        </div>
      </Router>
      <ToastContainer position="bottom-right" />
    </React.Fragment>
  );
}

export default App;
