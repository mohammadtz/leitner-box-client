import React, { CSSProperties } from "react";
import { LandingLayout } from "../../Layouts/Landing/LandingLayout";

export const Home = () => {
  const style: CSSProperties = {
    backgroundColor: "turquoise",
    textAlign: "center",
    height: "100%",
  };
  return (
    <LandingLayout>
      <div style={style}>
        <h1>Home</h1>
      </div>
    </LandingLayout>
  );
};
