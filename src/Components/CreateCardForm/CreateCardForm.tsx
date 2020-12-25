import { AxiosResponse } from "axios";
import { useLocalStore, useObserver } from "mobx-react-lite";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { Img_Close, Img_Loader } from "../../assets/Export";
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
    tags: [] as any[],
    value: "",
  },
  loaderVisibility: false,
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
        if (!value.includes(",")) local.back_card.value = value;
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    local.back_card.tags.push(local.back_card.value);
    local.back_card.value = "";
  };

  const loader = () => (
    <div className="create-card-form__loader">
      <img src={Img_Loader} alt="" />
    </div>
  );

  const renderTag = (tag: string, index: number) => {
    return (
      <div className="tag-style">
        <img
          src={Img_Close}
          alt=""
          height={16}
          onClick={() => local.back_card.tags.splice(index, 1)}
        />
        <span>{tag}</span>
      </div>
    );
  };

  const onClickSubmit = async () => {
    if (
      (local.back_card.tags.length < 1 && !local.fornt_card.value) ||
      !local.fornt_card.value
    ) {
      return toast(RenderMessage().general.required_msg, {
        type: "error",
      });
    }
    try {
      local.loaderVisibility = true;
      const res = await sendRequest({
        url: "/cards",
        method: "POST",
        data: {
          front: local.fornt_card.value,
          back:
            local.back_card.tags.length > 0
              ? local.back_card.tags.join(",")
              : local.back_card.value,
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
        local.back_card.tags = [];
        return toast(RenderMessage().general.save_success, { type: "success" });
      }
    } catch (error) {
    } finally {
      local.loaderVisibility = false;
    }
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
            autoFocus
          />
          <LoginTextBox
            placeholder={local.back_card.placeholder}
            value={local.back_card.value}
            onChange={(e) =>
              handleValueChanged(local.back_card.title, e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === ",") {
                return onSubmit();
              }
            }}
          />
          <br />
          <div className="tag-container">
            {local.back_card.tags.map((tag, index) => {
              return renderTag(tag, index);
            })}
          </div>
          <button style={{ display: "none" }}></button>
          <button type="button" onClick={onClickSubmit}>
            {RenderMessage().create_card.submit}
          </button>
        </form>
      </div>
      {local.loaderVisibility && loader()}
    </div>
  ));
};
