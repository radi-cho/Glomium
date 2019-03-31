import React from "react";
import { withRouter } from "react-router-dom";
import "../styles/InfoCard.css";

const Card = ({ title, description, redirect, history, clickHandler }) => {
  if (typeof title === "string" && title.trim()) {
    const trimmed = title.trim();
    title = trimmed.length > 19 ? trimmed.substring(0, 16) + "..." : trimmed;
  } else {
    title = "Unnamed card.";
  }

  if (typeof description === "string") {
    description = description.replace(/- \[ \]/g, "");
    description = description.replace(/- \[x\]/g, "");
    const trimmed = description.trim();
    if (trimmed)
      description =
        trimmed.length > 26 ? trimmed.substring(0, 25) + "..." : trimmed;
  } else {
    description = "No description provided.";
  }

  return (
    <div
      className="card-container"
      onClick={
        clickHandler
          ? clickHandler
          : () => {
              history.push(redirect);
            }
      }
    >
      <div className="card-title">{title}</div>
      <div className="card-description">{description}</div>
    </div>
  );
};

export default withRouter(Card);
