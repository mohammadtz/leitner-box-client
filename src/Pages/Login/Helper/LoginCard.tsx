import React, { useContext } from "react";
import { LoginTextBox } from "../../../Components/LoginTextBox/LoginTextBox";
import { RenderMessage } from "../../../Localization/RenderMessage";
import { useHistory } from "react-router-dom";
import { ICount, sendRequest, setStore } from "../../../Helper";
import { useLocalStore, useObserver } from "mobx-react-lite";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import { StoreContext } from "../../../Store";

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
  const store = useLocalStore(() => serverStore);
  const handleChange = (name: string, value1: any) => {
    switch (name) {
      case "username":
        store.object.username = value1;
        break;
      case "password":
        store.object.password = value1;
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!store.object.username) {
      return toast(
        RenderMessage().message.cant_null.replace(
          "{0}",
          RenderMessage().sign_in.username
        ),
        { type: "error" }
      );
    }
    if (!store.object.password) {
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
          user_name: store.object.username,
          password: store.object.password,
        },
      });
      if (res && res.data && res.status === 200) {
        setStore("user", JSON.stringify(res.data));
        const count: AxiosResponse<ICount> = await sendRequest({
          url: "/cards/count",
        });
        if (count.data) {
          setStore("count", count.data);
          context.CountStore = count.data;
        }
        store.data = res.data;
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
        value={store.object.username}
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
        value={store.object.password}
        onChange={(e) => handleChange("password", e.target.value)}
        name={"password"}
      />
      <button className="submit">{RenderMessage().sign_in.title}</button>
    </form>
  ));
};
