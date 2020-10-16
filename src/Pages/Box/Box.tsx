import React from "react";
import { BoxCard } from "./Helper/BoxCard";
import "./Box.scss";
import { count } from "../../Helper";

export const Box = () => {
  return (
    <div className="box">
      <div className="box__container">
        <BoxCard count={count.box1} num="number1" />
        <BoxCard count={count.box2} num="number2" />
        <BoxCard count={count.box3} num="number3" />
        <BoxCard count={count.box4} num="number4" />
        <BoxCard count={count.box5} num="number5" />
      </div>
    </div>
  );
};
