import { getOptions } from "../Helper";
import Fa from "./Fa.json";
import En from "./En.json";

export const RenderMessage = () => {
  if (getOptions("lang") === "fa") {
    return Fa;
  } else {
    return En;
  }
};
