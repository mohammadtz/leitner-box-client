/* eslint-disable react-hooks/exhaustive-deps */
import { useLocalStore, useObserver } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Img_Number1,
  Img_Number2,
  Img_Number3,
  Img_Number4,
  Img_Number5,
} from "../../assets/Export";
import { sendRequest } from "../../Helper";
import { RenderMessage } from "../../Localization/RenderMessage";
import { ICard } from "../../Types";
import "./BrowseCard.scss";

interface IBrowseCard {
  data?: ICard;
  show_answer: boolean;
}

const localStore: IBrowseCard = {
  data: { back: "", box_number: 1, front: "", userId: "", date: "" },
  show_answer: false,
};

export const BrowseCard: React.FC = (props) => {
  const local = useLocalStore(() => localStore);
  const { num }: { num: string } = useParams();

  const getData = async () => {
    const res = await sendRequest({
      url: `/cards/${num}`,
    });
    if (res.status === 200) {
      local.data = res.data;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderImage = (): string => {
    if (Number(num) === 1) {
      return Img_Number1;
    } else if (Number(num) === 2) {
      return Img_Number2;
    } else if (Number(num) === 3) {
      return Img_Number3;
    } else if (Number(num) === 4) {
      return Img_Number4;
    } else if (Number(num) === 5) {
      return Img_Number5;
    }
    return "";
  };

  return useObserver(() => (
    <div className="browse-card">
      <div className="browse-card__container">
        <img src={renderImage()} alt="" />
        <div className="subject">
          <h1 className="subject__title">{local.data?.front}</h1>

          {local.show_answer && <h2>{local.data?.back}</h2>}
          <button
            className={"subject__show-answer"}
            onClick={() => (local.show_answer = !local.show_answer)}
          >
            {RenderMessage().pages.card.show_answer}
          </button>
        </div>
      </div>
    </div>
  ));
};
