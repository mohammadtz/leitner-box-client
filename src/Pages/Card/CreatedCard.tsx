import React from "react";
import { CreateCardForm } from "../../Components/CreateCardForm/CreateCardForm";
import "./Card.scss";

export const CreatedCard = () => {
  return (
    <div className="create-card">
      <CreateCardForm />
    </div>
  );
};
