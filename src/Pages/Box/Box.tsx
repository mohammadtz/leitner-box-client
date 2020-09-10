import React from "react";
import { BoxCard } from "./Helper/BoxCard";
import { RenderMessage } from "../../Localization/RenderMessage";
import "./Box.scss";

export const Box = () => {
  return (
    <div className="box">
      <div className="box__container">
        <BoxCard
          title={RenderMessage().pages.box.box_number.replace("{0}", "1")}
          count={2}
        />
        <BoxCard
          title={RenderMessage().pages.box.box_number.replace("{0}", "2")}
          count={5}
        />
        <BoxCard
          title={RenderMessage().pages.box.box_number.replace("{0}", "3")}
          count={7}
        />
        <BoxCard
          title={RenderMessage().pages.box.box_number.replace("{0}", "4")}
          count={4}
        />
        <BoxCard
          title={RenderMessage().pages.box.box_number.replace("{0}", "5")}
          count={6}
        />
      </div>
    </div>
  );
};
