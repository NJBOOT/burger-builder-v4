import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axiosOrders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions";

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrderData(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order
          key={order.id}
          id={order.id}
          handleDelete={() =>
            this.props.onDeleteOrder(order.id, this.props.token)
          }
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
    if (this.props.orders.length === 0) {
      return <h1 style={{ textAlign: "center" }}>No Orders Found</h1>;
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrderData: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
    onDeleteOrder: (id, token) =>
      dispatch(actions.handleDeleteOrder(id, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));

// handleDelete = id => {
//   axios
//     .delete("/orders/" + id + ".json")
//     .then(res => this.props.fetchOrderData())
//     .catch(err => console.log(err));
// };

// componentDidUpdate(pp) {
//   if (this.props.orders !== pp.orders) {
//     console.log(this.props.orders, pp.orders);
//   }
// }
