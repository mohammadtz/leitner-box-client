import React, { CSSProperties } from "react";

export const Home = () => {
  const style: CSSProperties = {
    backgroundColor: "turquoise",
    textAlign: "center",
    height: "100%",
  };
  return (
    <div style={style}>
      <h1>Home</h1>
    </div>
  );
};
