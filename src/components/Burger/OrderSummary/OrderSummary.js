import React from "react";
import formatPrice from "../../../helpers/price";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(el => (
    <li key={el}>
      <span style={{ textTransform: "capitalize" }}>{el}</span>:{" "}
      {props.ingredients[el]}
    </li>
  ));
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout?</p>
      <p>
        <strong>Total Price: {formatPrice.format(props.totalPrice)}</strong>
      </p>
      <Button handleClick={props.handleCancelPurchase} buttonType="Danger">
        CANCEL
      </Button>
      <Button handleClick={props.handleContinuePurchase} buttonType="Success">
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;
