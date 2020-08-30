import React, { useEffect } from "react";
import "./App.css";
import { Header } from "./Layouts/Landing/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Path } from "./Path";

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
          <Header Route={Path} />
        </div>
        <Switch>
          <Route key={"home"} path="/home/:lang" exact />
          <Route key={"about"} path="/about/:lang" />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
