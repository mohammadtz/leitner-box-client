import Axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { IUserData } from "./Types";

const store = require("store");

const server = "http://192.168.1.107:4000";
// const server = "http://192.168.1.103:4000";

export const getStore = (options: any) => store.get(options);
export const setStore = (options: any, value: any) => store.set(options, value);
export const removeStore = (options: any) => store.remove(options);

type TMethod =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "purge"
  | "PURGE"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK";

export type TSendRequest = {
  url?: string;
  data?: any;
  params?: any;
  method?: TMethod;
  showLog?: boolean;
};

export interface ICount {
  box1: number;
  box2: number;
  box3: number;
  box4: number;
  box5: number;
}

export const user: IUserData = getStore("user");
export const count: ICount = getStore("count");

export const sendRequest = async ({
  url,
  data,
  params,
  method = "get",
  showLog = true,
}: TSendRequest) => {
  try {
    const res = await Axios({
      url: `${server}/api${url}`,
      data,
      params,
      method,
      headers: {
        "auth-token": user?.token || "",
      },
    });
    console.log(res);
    if (res.status === 401) {
      removeStore("user");
      removeStore("count");
    }
    return res;
  } catch (error) {
    console.log(error.response);
    showLog && toast(error.response?.data.message, { type: "error" });
    throw error.response;
  }
};

export const GetCount = async () => {
  console.log(getStore("user"));
  const res: AxiosResponse<ICount> = await sendRequest({
    url: "/cards/count",
  });
  await setStore("count", res.data);
  return res;
};
