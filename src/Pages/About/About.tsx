import React, { CSSProperties } from "react";
import { LandingLayout } from "../../Layouts/Landing/LandingLayout";

export const About = () => {
  const style: CSSProperties = {
    backgroundColor: "tomato",
    textAlign: "center",
    height: "100%",
  };
  return (
    <LandingLayout>
      <div style={style}>
        <h1>About</h1>
      </div>
    </LandingLayout>
  );
};
