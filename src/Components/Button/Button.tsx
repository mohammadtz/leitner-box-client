import React from "react";
import { IGeneralComponents } from "../../Types";
import "./Button.scss";

interface IButton extends IGeneralComponents {
  type?: "containd" | "outline" | "text";
  color?: "danger";
}

export const Button: React.FC<IButton> = ({
  children,
  height,
  width,
  className,
  style,
  type = "containd",
  color,
  onClick,
}) => {
  return (
    <button
      className={`button ${className} btn-${type} btn-${type}-${color}`}
      style={{ ...style, width, height }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
