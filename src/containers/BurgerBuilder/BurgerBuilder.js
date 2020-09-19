import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  const dispatch = useDispatch();

  const ingredients = useSelector(state => state.burgerBuilder.ingredients);
  const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
  const error = useSelector(state => state.burgerBuilder.error);
  const isAuth = useSelector(state => state.auth.token !== null);

  const onIngredientAdded = name => dispatch(actions.addIngredient(name));
  const onIngredientRemoved = name => dispatch(actions.removeIngredient(name));
  const onClearOrder = () => dispatch(actions.clearOrder());
  const onInitIngredients = useCallback(
    () => dispatch(actions.initIngredients()),
    [dispatch]
  );
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = path =>
    dispatch(actions.setAuthRedirectPath(path));

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
    if (isAuth) {
      setOrdered(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const modalClose = () => {
    setOrdered(false);
  };

  const handleContinuePurchase = () => {
    onInitPurchase();
    props.history.push("/checkout");
  };

  const disabledInfo = { ...ingredients };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = null;
  let burger = error ? <p>Ingredients can't be loaded...</p> : <Spinner />;
  if (ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={ingredients} />
        <BuildControls
          handleAddIngredient={onIngredientAdded}
          handleRemoveIngredient={onIngredientRemoved}
          disabledInfo={disabledInfo}
          totalPrice={totalPrice}
          purchasable={updatePurchasable(ingredients)}
          handleOrder={handleOrder}
          handleClearOrder={onClearOrder}
          isAuth={isAuth}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        handleCancelPurchase={modalClose}
        handleContinuePurchase={handleContinuePurchase}
        ingredients={ingredients}
        totalPrice={totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
