import React from "react";
import "./Login.scss";
import { LoginContainer } from "./Helper/LoginContainer";
import { RenderMessage } from "../../Localization/RenderMessage";
import { useHistory } from "react-router-dom";
import { getOptions } from "../../Helper";

export const Login = () => {
  const history = useHistory();
  return (
    <div className="login">
      <LoginContainer />
      <button onClick={() => history.push("/home")}>
        <i
          className={
            getOptions("lang") === "fa"
              ? "fa fa-arrow-right"
              : "fa fa-arrow-left"
          }
        ></i>
        <span>{RenderMessage().login.backToHome}</span>
      </button>
    </div>
  );
};
