import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { RenderMessage } from "../../../Localization/RenderMessage";
import { useHistory } from "react-router-dom";

export type RouteType = {
  src: string;
  text: string;
  key: any;
}[];

interface IHeaderProps {
  Route: RouteType;
  history?: any;
}

export const Header = (props: IHeaderProps) => {
  const history = useHistory();
  const renderNavItem = () =>
    props.Route.map((item) => (
      <div key={item.key}>
        <Link to={item.src}>{item.text}</Link>
      </div>
    ));
  return (
    <header>
      <div>
        <button onClick={() => history.push("/login")}>
          {RenderMessage().general.account}
        </button>
      </div>
      <nav>{renderNavItem()}</nav>
    </header>
  );
};
