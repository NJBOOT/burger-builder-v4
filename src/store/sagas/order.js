import { put } from "redux-saga/effects";
import axios from "../../axiosOrders";
import * as actions from "../actions";

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const res = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    );
    yield put(actions.purchaseBurgerSuccess(res.data.name, action.orderData));
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  try {
    const queryParams =
      "?auth=" +
      action.token +
      '&orderBy="userId"&equalTo="' +
      action.userId +
      '"';
    const res = yield axios.get("/orders.json" + queryParams);
    const fetchedOrders = [];
    for (let key in res.data) {
      fetchedOrders.push({ ...res.data[key], id: key });
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFail(error));
  }
}

export function* deleteOrdersSaga(action) {
  try {
    axios.delete("/orders/" + action.id + ".json?auth=" + action.token);
    yield put(actions.deleteOrder(action.id));
  } catch (error) {
    yield put(actions.deleteOrderFail(error));
  }
}
