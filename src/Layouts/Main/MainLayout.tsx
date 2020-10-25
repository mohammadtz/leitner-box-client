import React from "react";
import { Switch, Route } from "react-router-dom";
import { Menu } from "./Helper/Menu";
import "./Main.scss";
import { MenuList } from "./Helper/MenuList";
import { Header } from "../Landing/Header/Header";
import { Path } from "../../Path";

export const MainLayout = () => {
  return (
    <div className="main">
      <Header Route={Path} />
      <div className="main__body">
        <div className="menu-container">
          <Menu />
        </div>
        <div className="body">
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
    </div>
  );
};
