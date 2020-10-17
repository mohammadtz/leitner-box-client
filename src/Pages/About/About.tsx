import React, { CSSProperties } from "react";

export const About = () => {
  const style: CSSProperties = {
    backgroundColor: "tomato",
    textAlign: "center",
    height: "100%",
  };
  return (
    <div style={style}>
      <h1>About</h1>
    </div>
  );
};
