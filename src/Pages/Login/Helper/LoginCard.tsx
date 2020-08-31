import React, { useState } from "react";
import { LoginTextBox } from "../../../Components/LoginTextBox/LoginTextBox";
import { RenderMessage } from "../../../Localization/RenderMessage";

export const LoginCard = () => {
  const [value, setValue] = useState({ username: "", password: "" });
  const handleChange = (name: string, value1: any) => {
    let val = { ...value };
    switch (name) {
      case "username":
        val.username = value1;
        break;
      case "password":
        val.password = value1;
        break;
      default:
        break;
    }
    setValue(val);
  };
  return (
    <div className="login-card">
      <h2>{RenderMessage().signIn.title}</h2>
      <LoginTextBox
        icon="fa fa-user"
        placeholder={RenderMessage().general.placeholder(
          RenderMessage().signIn.username
        )}
        value={value.username}
        onChange={(e) => handleChange("username", e.target.value)}
      />
      <LoginTextBox
        icon="fa fa-key"
        placeholder={RenderMessage().general.placeholder(
          RenderMessage().signIn.password
        )}
        passMode={true}
        value={value.password}
        onChange={(e) => handleChange("password", e.target.value)}
      />
      <button onClick={() => console.log(value)} className="submit">
        Submit
      </button>
    </div>
  );
};
