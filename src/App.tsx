import React from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Login } from "./Pages";
import { MainLayout } from "./Layouts/Main/MainLayout";
import { useObserver } from "mobx-react-lite";
import './Components/style.scss';

const store = require("store");

function App() {
  store.set("lang", "fa");
  return useObserver(() => (
    <React.Fragment>
      <div className="App" dir={store.get("lang") === "fa" ? "rtl" : "ltr"}>
        <Router>
          <Switch>
            {/* <Route key={"home"} path="/home/:lang?" exact component={Home} />
            <Route key={"about"} path="/about/:lang?" exact component={About} /> */}
            <Route key={"login"} path="/login/:type?" exact component={Login} />
            <Route
              key={"main"}
              path="/main/:type/:num?"
              exact
              component={MainLayout}
            />
            <Redirect to={"/login"} />
          </Switch>
        </Router>
      </div>
      <ToastContainer position="bottom-right" />
    </React.Fragment>
  ));
}

export default App;
