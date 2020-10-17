import React from "react";
import { RenderMessage } from "../../../Localization/RenderMessage";

interface IBoxCard {
  title?: string;
  count?: number | string;
  num: "number1" | "number2" | "number3" | "number4" | "number5";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const BoxCard = (props: IBoxCard) => {
  return (
    <button className="box-card" onClick={props.onClick}>
      <div className="box-card__child">
        <img src={require("./../../../assets/svg/inbox.svg")} alt="" />
        <img
          className="number"
          src={require(`./../../../assets/png/${props.num}.png`)}
          alt=""
        />
        <div>
          <span>{RenderMessage().pages.box.card_count}</span>
          <span>{props.count}</span>
        </div>
      </div>
    </button>
  );
};
