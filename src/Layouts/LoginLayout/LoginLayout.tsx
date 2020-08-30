import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login } from "../../Pages";
import "./LoginLayout.scss";

export const LoginLayout = () => {
  return (
    <div className="login-layout">
      <Switch>
        <Route key={"login"} path="/login/:lang?" exact component={Login} />
      </Switch>
    </div>
  );
};
