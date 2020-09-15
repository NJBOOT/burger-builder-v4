import React from "react";
import classes from "./Button.module.css";

const Button = props => {
  return (
    <button
      disabled={props.disabled}
      className={[classes.Button, classes[props.buttonType]].join(" ")}
      onClick={props.handleClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
