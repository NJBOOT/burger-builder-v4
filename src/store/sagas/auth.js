import { put, delay } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions";

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  const API_KEY = "AIzaSyC9O9D2jeIx5xS4bYzAjOHc8ZjTcTQXivo";
  let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  if (!action.isSignup) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  }
  try {
    const res = yield axios.post(url + API_KEY, authData);

    const expirationDate = yield new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", res.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", res.data.localId);
    yield put(actions.authSuccess(res.data.idToken, res.data.localId));
    yield put(actions.checkAuthTimeout(res.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const expDate = yield new Date(localStorage.getItem("expirationDate"));
    if (expDate > new Date()) {
      const userId = yield localStorage.getItem("userId");
      const expiresIn = yield (expDate.getTime() - new Date().getTime()) / 1000;
      yield put(actions.authSuccess(token, userId));
      yield put(actions.checkAuthTimeout(expiresIn));
    } else {
      yield put(actions.logout());
    }
  }
}
