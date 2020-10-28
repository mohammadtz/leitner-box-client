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
import { GetCount, sendRequest } from "../../Helper";
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
  inputDisabled: boolean;
}

const localStore: IBrowseCard = {
  data: { back: "", box_number: 1, front: "", userId: "", date: "", _id: "" },
  show_answer: false,
  value: "",
  success: false,
  readOnly: false,
  loader: false,
  inputDisabled: false,
};

export const BrowseCard: React.FC = () => {
  const local = useLocalStore(() => localStore);
  const { num }: { num: string } = useParams();
  const context = useContext(StoreContext);
  const history = useHistory();

  const getData = async () => {
    local.inputDisabled = false;
    local.show_answer = false;
    local.loader = true;
    try {
      const res = await sendRequest({
        url: `/cards/${num}`,
      });
      if (res.status === 200) {
        local.data = res.data;
      }
    } catch (error) {
      if (error.request.status === 404) {
        const res = await GetCount();
        if (res.data) {
          context.CountStore = res.data;
        }
        history.push("/main/box");
      }
    } finally {
      local.loader = false;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderImage = (): string => {
    switch (Number(num)) {
      case 1:
        return Img_Number1;
      case 2:
        return Img_Number2;

      case 3:
        return Img_Number3;

      case 4:
        return Img_Number4;

      case 5:
        return Img_Number5;
      default:
        break;
    }
    return "";
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
    sendData();
  };

  const sendData = async () => {
    local.loader = true;
    try {
      const res = await sendRequest({
        url: `/cards/${local.data?._id}`,
        method: "put",
        params: {
          answer: local.value,
        },
        showLog: false,
      });

      if (res.status === 200) {
        const getCount = await GetCount();
        context.CountStore = getCount.data;
        local.success = true;
        toast(RenderMessage().pages.card.the_answer_is_correct, {
          type: "success",
        });
      }
    } catch (error) {
      local.success = false;
      toast(RenderMessage().pages.card.the_answer_is_incorrect, {
        type: "error",
      });
    } finally {
      local.loader = false;
      local.value = "";
      local.show_answer = true;
      local.inputDisabled = true;
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
                autoFocus
                disabled={local.inputDisabled}
              />
              <button className="btn-success">
                {RenderMessage().general.submit}
              </button>
            </div>
          </form>

          <div className="subject__hide">
            {local.show_answer && (
              <>
                <button className="btn-info" onClick={getData}>
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
