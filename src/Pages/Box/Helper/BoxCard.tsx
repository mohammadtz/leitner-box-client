import React from "react";
import { RenderMessage } from "../../../Localization/RenderMessage";

interface IBoxCard {
  title?: string;
  count?: number | string;
}

export const BoxCard = (props: IBoxCard) => {
  return (
    <div className="box-card">
      <div className="box-card__child">
        <img src={require("./../../../assets/svg/inbox.svg")} alt="" />
        <div>{props.title}</div>
        <div>
          <span>{RenderMessage().pages.box.card_count}</span>
          <span>{props.count}</span>
        </div>
      </div>
    </div>
  );
};
