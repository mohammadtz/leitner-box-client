import React from "react";
import "./Login.scss";
import { LoginContainer } from "./Helper/LoginContainer";
import { useHistory } from "react-router-dom";
import { getStore } from "../../Helper";

export const Login = (props: any) => {
  const history = useHistory();
  if (getStore("user")) history.push("/main/box");
  return (
    <div className="login">
      <LoginContainer type={Number(props.match.params.type)} />
      {/* <button className="back-to-home" onClick={() => history.push("/home")}>
        <i
          className={
            getStore("lang") === "fa" ? "fa fa-arrow-right" : "fa fa-arrow-left"
          }
        ></i>
        <span>{RenderMessage().sign_in.back_to_home}</span>
      </button> */}
    </div>
  );
};
