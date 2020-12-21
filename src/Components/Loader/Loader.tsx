import React from "react";
import { Img_Loader } from "../../assets/Export";
import "./Loader.scss";

interface ILoader {
  visible: boolean;
}

export const Loader: React.FC<ILoader> = (props) => {
  return props.visible ? (
    <div className="loader">
      <img src={Img_Loader} alt="" />
    </div>
  ) : null;
};
