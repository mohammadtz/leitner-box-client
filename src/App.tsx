import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { About, Home, Login } from "./Pages";
import { MainLayout } from "./Layouts/Main/MainLayout";

const store = require("store");

function App() {
  store.set("lang", "fa");
  return (
    <React.Fragment>
      <div className="App" dir={store.get("lang") === "fa" ? "rtl" : "ltr"}>
        <Router>
          <Switch>
            <Route key={"home"} path="/home/:lang?" exact component={Home} />
            <Route key={"about"} path="/about/:lang?" exact component={About} />
            <Route key={"login"} path="/login/:type?" exact component={Login} />
            <Route key={"main"} path="/main/:type/:num?" exact component={MainLayout} />
            <Redirect to={"/home"} />
          </Switch>
        </Router>
      </div>
      <ToastContainer position="bottom-right" />
    </React.Fragment>
  );
}

export default App;
