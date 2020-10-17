import React from "react";
import { Switch, Route } from "react-router-dom";
import "./Body.scss";
import { Home, About, Login } from "../../../Pages";
import { Header } from "../Header/Header";
import { Path } from "../../../Path";
import { Main } from "../../Main/Main";

export const Body = () => {
  return (
    <div className="body">
      <React.Fragment>
        <Header Route={Path} />
        <Switch>
          <Route key={"home"} path="/home/:lang?" exact component={Home} />
          <Route key={"about"} path="/about/:lang?" exact component={About} />
          <Route key={"login"} path="/login/:type?" exact component={Login} />
          <Route key={"main"} path="/main/:type/:num?" exact component={Main} />
        </Switch>
      </React.Fragment>
    </div>
  );
};
