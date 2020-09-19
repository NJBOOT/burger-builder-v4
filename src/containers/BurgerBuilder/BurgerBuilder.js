import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "../../axiosOrders";
import * as actions from "../../store/actions/";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const BurgerBuilder = props => {
  const [ordered, setOrdered] = useState(false);

  const { onInitIngredients } = props;

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchasable = ingredients => {
    const sum = Object.values(ingredients).reduce((acc, el) => {
      return (acc += el);
    }, 0);
    return sum > 0;
  };

  const handleOrder = () => {
    if (props.isAuth) {
      setOrdered(true);
    } else {
      props.onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const modalClose = () => {
    setOrdered(false);
  };

  const handleContinuePurchase = () => {
    props.onInitPurchase();
    props.history.push("/checkout");
  };

  const disabledInfo = { ...props.ingredients };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = null;
  let burger = props.error ? (
    <p>Ingredients can't be loaded...</p>
  ) : (
    <Spinner />
  );
  if (props.ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={props.ingredients} />
        <BuildControls
          handleAddIngredient={props.onIngredientAdded}
          handleRemoveIngredient={props.onIngredientRemoved}
          disabledInfo={disabledInfo}
          totalPrice={props.totalPrice}
          purchasable={updatePurchasable(props.ingredients)}
          handleOrder={handleOrder}
          handleClearOrder={props.onClearOrder}
          isAuth={props.isAuth}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        handleCancelPurchase={modalClose}
        handleContinuePurchase={handleContinuePurchase}
        ingredients={props.ingredients}
        totalPrice={props.totalPrice}
      />
    );
  }
  return (
    <Aux>
      <Modal visible={ordered} modalClose={modalClose}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: name => dispatch(actions.addIngredient(name)),
    onIngredientRemoved: name => dispatch(actions.removeIngredient(name)),
    onClearOrder: () => dispatch(actions.clearOrder()),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
