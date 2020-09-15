import { put } from "redux-saga/effects";
import axios from "../../axiosOrders";
import * as actions from "../actions/";

export function* initIngredientsSaga(action) {
  try {
    const res = yield axios.get(
      "https://burger-builder-v3.firebaseio.com/ingredients.json"
    );
    yield put(actions.setIngredients(res.data));
  } catch (error) {
    yield put(actions.fetchIngredientsFailed());
  }
}
