import React, { useState } from "react";
import { LoginCard } from "./LoginCard";
import { SignUpCard } from "./SignUpCard";
import { RenderMessage } from "../../../Localization/RenderMessage";

export const LoginContainer = () => {
  const [login, setLogin] = useState(true);
  return (
    <div className="login__container">
      <div className="login__container__inner">
        <div className="login__container__inner__login-child">
          {login ? <LoginCard /> : null}
        </div>
        <div className="login__container__inner__sign-up-child">
          {!login ? <SignUpCard /> : null}
        </div>
      </div>
      <div className="login__container__outter">
        {login ? <RenderSideLogin /> : <RenderSideSignUp />}
      </div>
    </div>
  );
};

export const RenderSideLogin = () => {
  return (
    <div>
      <button className="submit login-button">
        {RenderMessage().signUp.title}
      </button>
    </div>
  );
};

export const RenderSideSignUp = () => {
  return <div></div>;
};
