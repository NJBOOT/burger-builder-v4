import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "../../../axiosOrders";
import { updateObject, checkValidity } from "../../../shared/utility";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions";

const ContactData = props => {
  let initialForm = {
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Street",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Zip Code",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your Email",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "fastest",
      valid: true,
      validation: {},
    },
  };
  const [orderForm, setOrderForm] = useState(initialForm);
  const [formIsValid, setFormIsValid] = useState(false);

  const handleOrder = e => {
    e.preventDefault();

    const formData = {};
    for (let key in orderForm) {
      formData[key] = orderForm[key].value;
    }
    const order = {
      ingredients: props.ingredients,
      price: props.totalPrice,
      orderData: formData,
      userId: props.userId,
    };
    props.onOrderBurger(order, props.token);
  };

  const handleInputChange = (e, id) => {
    const { value } = e.target;
    const elCopy = updateObject(orderForm[id], {
      value: value,
      valid: checkValidity(value, orderForm[id].validation),
      touched: true,
    });
    const formCopy = updateObject(orderForm, {
      [id]: elCopy,
    });
    let formIsValid = true;
    for (let el in formCopy) {
      formIsValid = formCopy[el].valid && formIsValid;
    }
    setOrderForm(formCopy);
    setFormIsValid(formIsValid);
  };

  const formElArray = [];
  for (let key in orderForm) {
    formElArray.push({
      id: key,
      config: orderForm[key],
    });
  }
  let form = (
    <form onSubmit={handleOrder}>
      {formElArray.map(el => (
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
      ))}
      <Button buttonType="Success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter Your Contact Data:</h4>
      {form}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));

// handleInputChange = (e, inputID) => {
//   const { value } = e.target;
//   const form = { ...this.state.orderForm };
//   const formEl = { ...form[inputID] };
//   formEl.value = value;
//   formEl.valid = this.checkValidity(formEl.value, formEl.validation);
//   formEl.touched = true;
//   form[inputID] = formEl;

//   let formIsValid = true;
//   for (let key in form) {
//     formIsValid = form[key].valid && formIsValid;
//   }
//   this.setState({
//     orderForm: form,
//     formIsValid: formIsValid,
//   });
// };
