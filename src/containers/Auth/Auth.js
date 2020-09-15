import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { updateObject, checkValidity } from "../../shared/utility";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

class Auth extends Component {
  state = {
    controls: {
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
    },
    isSignup: true,
  };

  componentDidMount() {
    if (!this.props.isBuilding && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  handleInputChange = (e, controlName) => {
    const { value } = e.target;
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: value,
        valid: checkValidity(
          value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      }),
    });
    this.setState({ controls: updatedControls });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  handlSwitchAuthMode = () => {
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup,
      };
    });
  };

  render() {
    const formElArray = [];
    for (let key in this.state.controls) {
      formElArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElArray.map(el => (
      <Input
        key={el.id}
        elementType={el.config.elementType}
        elementConfig={el.config.elementConfig}
        value={el.config.value}
        handleChange={e => this.handleInputChange(e, el.id)}
        invalid={!el.config.valid}
        shouldValidate={el.config.validation}
        touched={el.config.touched}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>Error: {this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuth) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.handleSubmit}>
          {form}
          <Button buttonType="Success">SUBMIT</Button>
        </form>
        <Button buttonType="Danger" handleClick={this.handlSwitchAuthMode}>
          Switch to {this.state.isSignup ? "SIGN IN" : "SIGN UP"}
        </Button>
      </div>
    );
  }
}

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
