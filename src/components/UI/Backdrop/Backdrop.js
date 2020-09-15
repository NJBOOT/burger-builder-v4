import React from "react";
import classes from "./Backdrop.module.css";

const Backdrop = props => {
  return props.visible ? (
    <div className={classes.Backdrop} onClick={props.close}></div>
  ) : null;
};

export default Backdrop;
