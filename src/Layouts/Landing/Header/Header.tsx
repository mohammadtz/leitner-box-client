import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { RenderMessage } from "../../../Localization/RenderMessage";

export type RouteType = {
  src: string;
  text: string;
  key: any;
}[];

interface IHeaderProps {
  Route: RouteType;
}

export const Header = (props: IHeaderProps) => {
  const renderNavItem = () =>
    props.Route.map((item) => (
      <span key={item.key}>
        <Link to={item.src}>{item.text}</Link>
      </span>
    ));
  return (
    <header>
      <div>
        <button>{RenderMessage()?.general.account}</button>
      </div>
      <nav>{renderNavItem()}</nav>
    </header>
  );
};
