import React, { useState } from "react";
import "./LoginTextBox.scss";

interface ILoginTextBox {
  icon?: string;
  placeholder?: string;
  passMode?: boolean;
  value?: string | number | readonly string[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  autoFocus?: boolean;
  max?: string | number;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const LoginTextBox = (props: ILoginTextBox) => {
  const [type, setType] = useState(props.passMode);
  const renderShowPassword = () =>
    props.passMode ? (
      <div
        className="login-textbox__eye-container"
        onClick={() => setType(!type)}
      >
        <i className={type ? "fa fa-eye-slash" : "fa fa-eye"}></i>
      </div>
    ) : null;
  return (
    <div className="login-textbox">
      {props.icon && (
        <div className="login-textbox__icon-container">
          <i className={props.icon}></i>
        </div>
      )}
      <input
        type={type ? "password" : "text"}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        autoFocus={props.autoFocus}
        max={props.max}
        onKeyDown={props.onKeyDown}
      />
      {renderShowPassword()}
    </div>
  );
};
