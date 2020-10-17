import React from "react";
import { Switch, Route } from "react-router-dom";
import { Menu } from "./Helper/Menu";
import "./Main.scss";
import { MenuList } from "./Helper/MenuList";

export const Main = () => {
  return (
    <div className="main">
      <Menu />
      <div className="main__body">
        <Switch>
          {MenuList.map((item) => {
            return (
              <Route
                key={item.key}
                path={item.path}
                exact
                component={item.componets}
              />
            );
          })}
        </Switch>
      </div>
    </div>
  );
};
