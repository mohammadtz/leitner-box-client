import React, { useState } from "react";
import { motion } from "framer-motion";
import { RenderMessage } from "../../../Localization/RenderMessage";
import { LoginTextBox } from "../../../Components/LoginTextBox/LoginTextBox";

export const SignUpCard = () => {
  const signUp = { username: "", email: "", password: "", reTypePass: "" };
  const [value, setValue] = useState(signUp);
  const handleChange = (name: string, value1: any) => {
    let val = { ...value };
    switch (name) {
      case "username":
        val.username = value1;
        break;
      case "email":
        val.email = value1;
        break;
      case "password":
        val.username = value1;
        break;
      case "reTypePass":
        val.reTypePass = value1;
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
      className="sign-up-card"
    >
      <h2>{RenderMessage().signUp.title}</h2>
      <LoginTextBox
        icon="fa fa-user"
        placeholder={RenderMessage().general.placeholder.replace(
          "{0}",
          RenderMessage().signIn.username
        )}
        value={value.username}
        onChange={(e) => handleChange("username", e.target.value)}
        name={"username"}
      />
      <LoginTextBox
        icon="fa fa-envelope"
        placeholder={RenderMessage().general.placeholder.replace(
          "{0}",
          RenderMessage().signUp.email
        )}
        value={value.username}
        onChange={(e) => handleChange("username", e.target.value)}
        name={"email"}
      />
      <LoginTextBox
        icon="fa fa-key"
        placeholder={RenderMessage().general.placeholder.replace(
          "{0}",
          RenderMessage().signIn.password
        )}
        passMode={true}
        value={value.password}
        onChange={(e) => handleChange("password", e.target.value)}
        name={"password"}
      />
      <LoginTextBox
        icon="fa fa-key"
        placeholder={RenderMessage().general.placeholder.replace(
          "{0}",
          RenderMessage().signUp.reTypePass
        )}
        passMode={true}
        value={value.reTypePass}
        onChange={(e) => handleChange("reTypePass", e.target.value)}
        name={"password"}
      />
      <button onClick={() => console.log(value)} className="submit">
        {RenderMessage().signIn.title}
      </button>
    </motion.div>
  );
};
