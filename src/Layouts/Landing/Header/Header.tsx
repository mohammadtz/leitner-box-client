import React, { useState } from "react";
import "./Header.scss";
import { RenderMessage } from "../../../Localization/RenderMessage";
import { useHistory } from "react-router-dom";
import { getStore } from "../../../Helper";
import moment from "moment-jalaali";

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
  let day = moment(Date.now()).format("jYYYY/jMM/jDD HH:mm:ss");
  const [today, setToday] = useState(day);
  const history = useHistory();
  // const renderNavItem = () =>
  //   props.Route.map((item) => (
  //     <div key={item.key}>
  //       <Link to={item.src}>{item.text}</Link>
  //     </div>
  //   ));

  setInterval(() => {
    setToday(moment(Date.now()).format("jYYYY/jMM/jDD HH:mm:ss"));
  }, 1000);

  return (
    <header>
      <div>
        <button onClick={() => history.push(`/login/${getStore("loginType")}`)}>
          {RenderMessage().general.account}
        </button>
      </div>
      <span dir="ltr">{today}</span>
      {/* <nav>{renderNavItem()}</nav> */}
    </header>
  );
};
