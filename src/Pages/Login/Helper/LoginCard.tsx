import React, { useContext } from "react";
import { LoginTextBox } from "../../../Components/LoginTextBox/LoginTextBox";
import { RenderMessage } from "../../../Localization/RenderMessage";
import { sendRequest, setStore } from "../../../Helper";
import { useLocalStore, useObserver } from "mobx-react-lite";
import { toast } from "react-toastify";
import { StoreContext } from "../../../Store";
import { useHistory } from "react-router-dom";

type loginModel = {
  id: number;
  username: string;
  password: string;
};

type serverStore = {
  object: loginModel;
  data: loginModel[];
};

export const LoginCard = () => {
  const context = useContext(StoreContext);
  const history = useHistory();

  const serverStore: serverStore = {
    data: [],
    object: { id: 0, password: "", username: "" },
  };

  const local = useLocalStore(() => serverStore);
  const handleChange = (name: string, value1: any) => {
    switch (name) {
      case "username":
        local.object.username = value1;
        break;
      case "password":
        local.object.password = value1;
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!local.object.username) {
      return toast(
        RenderMessage().message.cant_null.replace(
          "{0}",
          RenderMessage().sign_in.username
        ),
        { type: "error" }
      );
    }
    if (!local.object.password) {
      return toast(
        RenderMessage().message.cant_null.replace(
          "{0}",
          RenderMessage().sign_in.password
        ),
        { type: "error" }
      );
    }
    try {
      const res = await sendRequest({
        url: "/user/login",
        method: "POST",
        data: {
          user_name: local.object.username,
          password: local.object.password,
        },
      });
      if (res.status === 200) {
        setStore("user", res.data);
        local.data = res.data;
        context.CountStore = res.data.count;
        history.push("/main/box");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return useObserver(() => (
    <form onSubmit={onSubmit} className="login-card">
      <h2>{RenderMessage().sign_in.title}</h2>
      <LoginTextBox
        icon="fa fa-user"
        placeholder={RenderMessage().general.placeholder.replace(
          "{0}",
          RenderMessage().sign_in.username
        )}
        value={local.object.username}
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
        value={local.object.password}
        onChange={(e) => handleChange("password", e.target.value)}
        name={"password"}
      />
      <button className="submit">{RenderMessage().sign_in.title}</button>
    </form>
  ));
};
