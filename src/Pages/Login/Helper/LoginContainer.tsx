import React, { useState } from "react";
import { LoginCard } from "./LoginCard";
import { SignUpCard } from "./SignUpCard";
import { RenderMessage } from "../../../Localization/RenderMessage";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { getOptions } from "../../../Helper";

const store = require("store");

export const LoginContainer = (props: { type: number }) => {
  store.set("loginType", props.type);

  const [login, setLogin] = useState(
    getOptions("loginType") === 1 ? true : false
  );

  const history = useHistory();

  const RenderSideLogin = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          className="submit login-button"
          onClick={() => {
            setLogin(false);
            history.push("/login/2");
          }}
        >
          {RenderMessage().sign_up.title}
        </button>
      </motion.div>
    );
  };

  const RenderSideSignUp = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          className="submit login-button"
          onClick={() => {
            setLogin(true);
            history.push("/login/1");
          }}
        >
          {RenderMessage().sign_in.title}
        </button>
      </motion.div>
    );
  };

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={
          login
            ? "login__container__outter-login"
            : "login__container__outter-sign-up"
        }
      >
        {login ? <RenderSideLogin /> : <RenderSideSignUp />}
      </motion.div>
    </div>
  );
};
