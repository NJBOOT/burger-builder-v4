import React from "react";
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

export class BurgerBuilder extends React.Component {
  state = {
    ordered: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchasable = ingredients => {
    const sum = Object.values(ingredients).reduce((acc, el) => {
      return (acc += el);
    }, 0);
    return sum > 0;
  };

  handleOrder = () => {
    if (this.props.isAuth) {
      this.setState({ ordered: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  modalClose = () => {
    this.setState({ ordered: false });
  };

  handleContinuePurchase = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = { ...this.props.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded...</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            handleAddIngredient={this.props.onIngredientAdded}
            handleRemoveIngredient={this.props.onIngredientRemoved}
            disabledInfo={disabledInfo}
            totalPrice={this.props.totalPrice}
            purchasable={this.updatePurchasable(this.props.ingredients)}
            handleOrder={this.handleOrder}
            handleClearOrder={this.props.onClearOrder}
            isAuth={this.props.isAuth}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          handleCancelPurchase={this.modalClose}
          handleContinuePurchase={this.handleContinuePurchase}
          ingredients={this.props.ingredients}
          totalPrice={this.props.totalPrice}
        />
      );
    }
    return (
      <Aux>
        <Modal visible={this.state.ordered} modalClose={this.modalClose}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

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
