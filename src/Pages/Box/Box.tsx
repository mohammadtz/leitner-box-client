/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { BoxCard } from "./Helper/BoxCard";
import "./Box.scss";
import { StoreContext } from "../../Store";
import { useHistory } from "react-router-dom";
import { GetCount, getStore } from "../../Helper";
import { useObserver } from "mobx-react-lite";

export const Box = () => {
  const context = useContext(StoreContext);
  const history = useHistory();

  const onClick = (num: number) => {
    history.push(`/main/box/${num}`);
  };

  const getCount = async () => {
    if (getStore("user")) {
      const res = await GetCount();
      context.CountStore = res.data;
    }
  };

  useEffect(() => {
    getCount();
  }, [context.CountStore]);

  return useObserver(() => (
    <div className="box">
      <div className="box__container">
        <BoxCard
          count={context.CountStore.box1}
          num="number1"
          onClick={() => onClick(1)}
        />
        <BoxCard
          count={context.CountStore.box2}
          num="number2"
          onClick={() => onClick(2)}
        />
        <BoxCard
          count={context.CountStore.box3}
          num="number3"
          onClick={() => onClick(3)}
        />
        <BoxCard
          count={context.CountStore.box4}
          num="number4"
          onClick={() => onClick(4)}
        />
        <BoxCard
          count={context.CountStore.box5}
          num="number5"
          onClick={() => onClick(5)}
        />
      </div>
    </div>
  ));
};
