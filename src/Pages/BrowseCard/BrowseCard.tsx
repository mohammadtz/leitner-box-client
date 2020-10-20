/* eslint-disable react-hooks/exhaustive-deps */
import { useLocalStore, useObserver } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Img_Loader,
  Img_Number1,
  Img_Number2,
  Img_Number3,
  Img_Number4,
  Img_Number5,
} from "../../assets/Export";
import { sendRequest, setStore } from "../../Helper";
import { RenderMessage } from "../../Localization/RenderMessage";
import { StoreContext } from "../../Store";
import { ICard } from "../../Types";
import "./BrowseCard.scss";

interface IBrowseCard {
  data?: ICard;
  show_answer: boolean;
  value: string;
  success: boolean;
  readOnly: boolean;
  loader: boolean;
}

const localStore: IBrowseCard = {
  data: { back: "", box_number: 1, front: "", userId: "", date: "", _id: "" },
  show_answer: false,
  value: "",
  success: false,
  readOnly: false,
  loader: false,
};

export const BrowseCard: React.FC = (props) => {
  const local = useLocalStore(() => localStore);
  const { num }: { num: string } = useParams();
  const context = useContext(StoreContext);
  const history = useHistory();

  const getData = async () => {
    try {
      const res = await sendRequest({
        url: `/cards/${num}`,
      });
      if (res.status === 200) {
        local.data = res.data;
      }
    } catch (error) {
      console.log(error);
      if (error.request.status === 404) {
        getCount();
        history.push("/main/box");
      }
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

  const getCount = async () => {
    const count = await sendRequest({
      url: "/cards/count",
    });
    context.CountStore = count.data;
    setStore("count", count.data);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!local.value) {
      toast(
        RenderMessage().message.cant_null.replace(
          "{0}",
          RenderMessage().general.answer
        ),
        { type: "info" }
      );
      return;
    }
    if (local.data?.back === local.value) {
      local.success = true;
      toast(RenderMessage().pages.card.the_answer_is_correct, {
        type: "success",
      });
    } else {
      local.success = false;
      toast(RenderMessage().pages.card.the_answer_is_incorrect, {
        type: "error",
      });
    }
    local.show_answer = true;
  };

  const sendData = async () => {
    local.loader = true;
    local.show_answer = false;
    local.value = "";
    try {
      const res = await sendRequest({
        url: `/cards/${local.data?._id}`,
        method: "put",
        params: {
          success: local.success ? "1" : "0",
        },
      });

      if (res.status === 200) {
        getData();
      }
    } catch (error) {
    } finally {
      local.loader = false;
    }
  };

  return useObserver(() => (
    <div className="browse-card">
      <div className="browse-card__container">
        <img src={renderImage()} alt="" />
        <div className="subject">
          <h1 className="subject__title">{local.data?.front}</h1>
          <form action="" className="subject__form" onSubmit={onSubmit}>
            <p>
              <small>
                {RenderMessage().pages.card.enter_the_correct_answer}
              </small>
            </p>
            <div className="input">
              <input
                type="text"
                value={local.value}
                onChange={(e) => (local.value = e.target.value)}
                readOnly={local.readOnly}
              />
              <button className="btn-success">
                {RenderMessage().general.submit}
              </button>
            </div>
          </form>

          <div className="subject__hide">
            {local.show_answer && (
              <>
                <button className="btn-info" onClick={sendData}>
                  {RenderMessage().general.next}
                </button>
                <h2>
                  <span>{`${RenderMessage().general.answer}: `}</span>
                  <span
                    className={local.success ? "success-color" : "danger-color"}
                  >
                    {local.data?.back}
                  </span>
                </h2>
              </>
            )}
          </div>
        </div>
        {local.loader && (
          <div className="browse-card__container__loader">
            <img src={Img_Loader} alt="" />
          </div>
        )}
      </div>
    </div>
  ));
};
