import React, { useState } from "react";
import { LoginTextBox } from "../../../Components/LoginTextBox/LoginTextBox";
import { RenderMessage } from "../../../Localization/RenderMessage";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

export const LoginCard = () => {
  const history = useHistory();
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="login-card"
    >
      <h2>{RenderMessage().sign_in.title}</h2>
      <LoginTextBox
        icon="fa fa-user"
        placeholder={RenderMessage().general.placeholder.replace(
          "{0}",
          RenderMessage().sign_in.username
        )}
        value={value.username}
        onChange={(e) => handleChange("username", e.target.value)}
        name={"username"}
      />
      <LoginTextBox
        icon="fa fa-key"
        placeholder={RenderMessage().general.placeholder.replace(
          "{0}",
          RenderMessage().sign_in.password
        )}
        passMode={true}
        value={value.password}
        onChange={(e) => handleChange("password", e.target.value)}
        name={"password"}
      />
      <button onClick={() => history.push("/main/box")} className="submit">
        {RenderMessage().sign_in.title}
      </button>
    </motion.div>
  );
};
