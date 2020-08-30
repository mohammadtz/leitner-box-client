import React from "react";
import { LoginCard } from "./LoginCard";
import { SignUpCard } from "./SignUpCard";

export const LoginContainer = () => {
  return (
    <div className="login__container">
      <div className="login__container__inner">
        <LoginCard />
        <SignUpCard />
      </div>
      <div className="login__container__outter"></div>
    </div>
  );
};
