import { getOptions } from "../Helper";
import { Fa } from "./Fa";
import { En } from "./En";

export const RenderMessage = () => {
  if (getOptions("lang") === "fa") {
    return Fa;
  } else {
    return En;
  }
};
