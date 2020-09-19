import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "../../axiosOrders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions";

const Orders = props => {
  const { fetchOrderData, token, userId } = props;
  useEffect(() => {
    fetchOrderData(token, userId);
  }, [fetchOrderData, token, userId]);

  let orders = <Spinner />;
  if (!props.loading) {
    orders = props.orders.map(order => (
      <Order
        key={order.id}
        id={order.id}
        handleDelete={() => props.onDeleteOrder(order.id, props.token)}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));
  }
  if (props.orders.length === 0) {
    return <h1 style={{ textAlign: "center" }}>No Orders Found</h1>;
  }
  return <div>{orders}</div>;
};

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
