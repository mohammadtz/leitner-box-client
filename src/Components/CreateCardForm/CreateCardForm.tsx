import { AxiosResponse } from "axios";
import { useLocalStore, useObserver } from "mobx-react-lite";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { ICount, sendRequest, setStore } from "../../Helper";
import { RenderMessage } from "../../Localization/RenderMessage";
import { StoreContext } from "../../Store";
import { LoginTextBox } from "../LoginTextBox/LoginTextBox";
import "./CreateCardForm.scss";

const localStore = {
  fornt_card: {
    title: "fornt card",
    placeholder: RenderMessage().create_card.front_card_placeholder,
    value: "",
  },
  back_card: {
    title: "back card",
    placeholder: RenderMessage().create_card.back_card_placeholder,
    value: "",
  },
};

export const CreateCardForm = () => {
  const context = useContext(StoreContext);
  const local = useLocalStore(() => localStore);

  const handleValueChanged = (name: string, value: string) => {
    switch (name) {
      case local.fornt_card.title:
        local.fornt_card.value = value;
        break;
      case local.back_card.title:
        local.back_card.value = value;
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!local.back_card.value || !local.fornt_card.value) {
      return toast(RenderMessage().general.required_msg, {
        type: "error",
      });
    }
    try {
      const res = await sendRequest({
        url: "/cards",
        method: "POST",
        data: {
          front: local.fornt_card.value,
          back: local.back_card.value,
        },
      });
      if (res.status === 200) {
        const count: AxiosResponse<ICount> = await sendRequest({
          url: "/cards/count",
        });
        if (count.data) {
          setStore("count", count.data);
          context.CountStore = count.data;
        }
        local.fornt_card.value = "";
        local.back_card.value = "";
        return toast(RenderMessage().general.save_success, { type: "success" });
      }
    } catch (error) {}
  };

  return useObserver(() => (
    <div className="create-card-form">
      <div className="create-card-form__icon">
        <i className="fa fa-file" aria-hidden="true"></i>
      </div>
      <div className="create-card-form__container">
        <h2>{RenderMessage().create_card.title}</h2>
        <form onSubmit={onSubmit}>
          <LoginTextBox
            placeholder={local.fornt_card.placeholder}
            value={local.fornt_card.value}
            onChange={(e) =>
              handleValueChanged(local.fornt_card.title, e.target.value)
            }
          />
          <LoginTextBox
            placeholder={local.back_card.placeholder}
            value={local.back_card.value}
            onChange={(e) =>
              handleValueChanged(local.back_card.title, e.target.value)
            }
          />
          <br />
          <button>{RenderMessage().create_card.submit}</button>
        </form>
      </div>
    </div>
  ));
};
