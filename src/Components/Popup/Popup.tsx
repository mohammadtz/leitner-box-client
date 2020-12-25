import React from "react";
import "./Popup.scss";

export interface IPopup {
  width?: number | string;
  visible?: boolean;
  className?: string;
}

export const Popup: React.FC<IPopup> = (props) => {
  return (
    <div className={`popup ${props.visible ? "visible" : "hide"}`}>
      {props.visible ? (
        <div
          className={`popup__container ${props.className}`}
          style={{ width: props.width }}
        >
          {props.children}
        </div>
      ) : null}
    </div>
  );
};
