import React from "react";
import { BoxCard } from "./Helper/BoxCard";
import "./Box.scss";

export const Box = () => {
  return (
    <div className="box">
      <div className="box__container">
        <BoxCard count={2} num="number1" />
        <BoxCard count={5} num="number2" />
        <BoxCard count={7} num="number3" />
        <BoxCard count={4} num="number4" />
        <BoxCard count={6} num="number5" />
      </div>
    </div>
  );
};
