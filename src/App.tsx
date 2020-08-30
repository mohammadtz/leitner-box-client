import React, { useEffect } from "react";
import "./App.scss";
import { Header } from "./Layouts/Landing/Header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import { Path } from "./Path";
import { Body } from "./Layouts/Landing/Body/Body";
import { LoginLayout } from "./Layouts/LoginLayout/LoginLayout";

const store = require("store");

function App(props: any) {
  useEffect(() => {
    console.log(props.match);
  });
  store.set("lang", "fa");
  return (
    <React.Fragment>
      <Router>
        <div className="App" dir={store.get("lang") === "fa" ? "rtl" : "ltr"}>
          <Body />
        </div>
      </Router>
      <Router>
        <LoginLayout />
      </Router>
    </React.Fragment>
  );
}

export default App;
