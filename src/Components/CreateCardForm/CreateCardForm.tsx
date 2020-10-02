import React, { useState } from "react";
import { RenderMessage } from "../../Localization/RenderMessage";
import { LoginTextBox } from "../LoginTextBox/LoginTextBox";
import "./CreateCardForm.scss";

const local = {
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
  const [data, setData] = useState(local);

  const handleValueChanged = (name: string, value: string) => {
    const values = { ...data };
    switch (name) {
      case data.fornt_card.title:
        values.fornt_card.value = value;
        break;
      case data.back_card.title:
        values.back_card.value = value;
        break;
      default:
        break;
    }
    setData(values);
  };

  return (
    <div className="create-card-form">
      <div className="create-card-form__icon">
        <i className="fa fa-file" aria-hidden="true"></i>
      </div>
      <div className="create-card-form__container">
        <h2>{RenderMessage().create_card.title}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <LoginTextBox
            placeholder={data.fornt_card.placeholder}
            value={data.fornt_card.value}
            onChange={(e) =>
              handleValueChanged(data.fornt_card.title, e.target.value)
            }
          />
          <LoginTextBox
            placeholder={data.back_card.placeholder}
            value={data.back_card.value}
            onChange={(e) =>
              handleValueChanged(data.back_card.title, e.target.value)
            }
          />
          <br />
          <button>{RenderMessage().create_card.submit}</button>
        </form>
      </div>
    </div>
  );
};
