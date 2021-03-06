/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { MenuList } from "./MenuList";
import { Link, useHistory } from "react-router-dom";

export const Menu = () => {
  const [routes, setRoutes] = useState(MenuList);
  const history = useHistory();
  const route = history.location.pathname;
  const renderMenu = () =>
    routes.map((item, index) => {
      const rt = [...routes];
      if (item.path === route) {
        rt[index].isActice = true;
      } else {
        rt[index].isActice = false;
      }
      if (!item.notShowMenu) {
        return (
          <li
            key={item.key}
            className="menu-list-style"
            style={item.isActice ? { backgroundColor: "#004d6a" } : {}}
          >
            <Link
              to={item.path}
              onClick={item.onClick}
              style={item.isActice ? { color: "white" } : {}}
            >
              {item.text}
            </Link>
          </li>
        );
      }
    });
  return <div className="menu">{renderMenu()}</div>;
};
