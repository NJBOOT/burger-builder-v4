import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { updateObject, checkValidity } from "../../shared/utility";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

const Auth = props => {
  let inititalControls = {
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email Address",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  };

  const [controls, setControls] = useState(inititalControls);
  const [isSignup, setIsSignup] = useState(true);

  const { isBuilding, authRedirectPath, onSetAuthRedirectPath } = props;

  useEffect(() => {
    if (!isBuilding && authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  }, [isBuilding, authRedirectPath, onSetAuthRedirectPath]);

  const handleInputChange = (e, controlName) => {
    const { value } = e.target;
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: value,
        valid: checkValidity(value, controls[controlName].validation),
        touched: true,
      }),
    });
    setControls(updatedControls);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignup);
  };

  const handlSwitchAuthMode = () => {
    setIsSignup(!isSignup);
  };

  const formElArray = [];
  for (let key in controls) {
    formElArray.push({
      id: key,
      config: controls[key],
    });
  }

  let form = formElArray.map(el => (
    <Input
      key={el.id}
      elementType={el.config.elementType}
      elementConfig={el.config.elementConfig}
      value={el.config.value}
      handleChange={e => handleInputChange(e, el.id)}
      invalid={!el.config.valid}
      shouldValidate={el.config.validation}
      touched={el.config.touched}
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>Error: {props.error.message}</p>;
  }

  let authRedirect = null;
  if (props.isAuth) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }
  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={handleSubmit}>
        {form}
        <Button buttonType="Success">SUBMIT</Button>
      </form>
      <Button buttonType="Danger" handleClick={handlSwitchAuthMode}>
        Switch to {isSignup ? "SIGN IN" : "SIGN UP"}
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    isBuilding: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

// handleInputChange = (e, controlName) => {
//   const { value } = e.target;
//   const updatedControls = {
//     ...this.state.controls,
//     [controlName]: {
//       ...this.state.controls[controlName],
//       value: value,
//       valid: this.checkValidity(
//         value,
//         this.state.controls[controlName].validation
//       ),
//       touched: true,
//     },
//   };
//   this.setState({ controls: updatedControls });
// };
