import React from "react";
import { Button as RSGButton } from "rsg-components";

const Button = props => {
  return (
    <RSGButton
      {...props}
      animationType="ripple"
      style={{
        padding: "3px 5px",
        fontSize: 15,
        background: "#5bc0be",
        color: "black",
        ...props.style
      }}
    >
      {props.children}
    </RSGButton>
  );
};

export default Button;
