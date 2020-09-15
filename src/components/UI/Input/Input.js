import React from "react";
import classes from "./Input.module.css";

const Input = props => {
  let inputEl = null;
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputEl = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.handleChange}
        />
      );
      break;
    case "textarea":
      inputEl = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.handleChange}
        />
      );
      break;
    case "select":
      inputEl = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.handleChange}
        >
          {props.elementConfig.options.map((option, i) => (
            <option key={i} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputEl = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.handleChange}
        />
      );
  }
  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = (
      <p className={classes.ValidationError}>Please enter a valid value!</p>
    );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputEl}
      {validationError}
    </div>
  );
};

export default Input;
