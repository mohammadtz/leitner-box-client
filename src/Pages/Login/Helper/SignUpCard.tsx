import React, { useContext } from "react";
import { RenderMessage } from "../../../Localization/RenderMessage";
import { LoginTextBox } from "../../../Components/LoginTextBox/LoginTextBox";
import { useLocalStore, useObserver } from "mobx-react-lite";
import { sendRequest, setStore } from "../../../Helper";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../../../Store";

export const SignUpCard = () => {
  const context = useContext(StoreContext);
  const history = useHistory();
  const signUp = {
    username: "",
    email: "",
    mobile: "",
    password: "",
    reTypePass: "",
  };
  const local = useLocalStore(() => signUp);
  const handleChange = (name: string, value: any) => {
    switch (name) {
      case "username":
        local.username = value;
        break;
      case "email":
        local.email = value;
        break;
      case "mobile":
        local.mobile = value;
        break;
      case "password":
        local.password = value;
        break;
      case "reTypePass":
        local.reTypePass = value;
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !local.username ||
      !local.password ||
      !local.reTypePass ||
      !local.email
    ) {
      return;
    }

    try {
      const res = await sendRequest({
        url: "/user/register",
        method: "POST",
        data: {
          user_name: local.username,
          email: local.email,
          mobile: local.mobile || undefined,
          password: local.password,
        },
      });
      if (res.status === 200) {
        toast(RenderMessage().message.success_register, { type: "success" });
        const resLogin = await sendRequest({
          url: "/user/login",
          method: "POST",
          data: {
            user_name: local.username,
            password: local.password,
          },
        });
        if (resLogin && resLogin.data) {
          setStore("user", resLogin.data);
          context.CountStore = resLogin.data.count;
          history.push("/main/box");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return useObserver(() => (
    <form onSubmit={onSubmit} className="sign-up-card">
      <h2>{RenderMessage().sign_up.title}</h2>
      <LoginTextBox
        icon="fa fa-user"
        placeholder={RenderMessage().general.placeholder.replace(
          "{0}",
          RenderMessage().sign_in.username
        )}
        value={local.username}
        onChange={(e) => handleChange("username", e.target.value)}
        name={"username"}
      />
      <LoginTextBox
        icon="fa fa-envelope"
        placeholder={RenderMessage().general.placeholder.replace(
          "{0}",
          RenderMessage().sign_up.email
        )}
        value={local.email}
        onChange={(e) => handleChange("email", e.target.value)}
        name={"email"}
      />
      <LoginTextBox
        icon="fa fa-phone"
        placeholder={RenderMessage().general.placeholder.replace(
          "{0}",
          RenderMessage().sign_up.mobile
        )}
        value={local.mobile}
        onChange={(e) => handleChange("mobile", e.target.value)}
        name={"mobile"}
      />
      <LoginTextBox
        icon="fa fa-key"
        placeholder={RenderMessage().general.placeholder.replace(
          "{0}",
          RenderMessage().sign_in.password
        )}
        passMode={true}
        value={local.password}
        onChange={(e) => handleChange("password", e.target.value)}
        name={"password"}
      />
      <LoginTextBox
        icon="fa fa-key"
        placeholder={RenderMessage().general.placeholder.replace(
          "{0}",
          RenderMessage().sign_up.re_type_Pass
        )}
        passMode={true}
        value={local.reTypePass}
        onChange={(e) => handleChange("reTypePass", e.target.value)}
        name={"password"}
      />
      <button className="submit">{RenderMessage().sign_in.title}</button>
    </form>
  ));
};
