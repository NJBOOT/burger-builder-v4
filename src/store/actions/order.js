import * as actionTypes from "./actionTypes";
// import axios from "../../axiosOrders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};
export const purchaseBurgerFail = err => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: err,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const deleteOrder = id => {
  return {
    type: actionTypes.DELETE_ORDER,
    orderId: id,
  };
};

export const deleteOrderFail = err => {
  return {
    type: actionTypes.DELETE_ORDER_FAIL,
    error: err,
  };
};

// async action creators

export const purchaseBurger = (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_BURGER,
    orderData: orderData,
    token: token,
  };
};

export const fetchOrders = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDERS,
    token: token,
    userId: userId,
  };
};

export const handleDeleteOrder = (id, token) => {
  return {
    type: actionTypes.DELETE_ORDERS,
    id: id,
    token: token,
  };
};

// export const handleDeleteOrder = (id, token) => {
//   return dispatch => {
//     axios
//       .delete("/orders/" + id + ".json?auth=" + token)
//       .then(dispatch(deleteOrder(id)))
//       .catch(err => deleteOrderFail(err));
//   };
// };
