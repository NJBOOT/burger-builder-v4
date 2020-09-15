import * as actionTypes from "./actionTypes";

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingName: name,
  };
};
export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingName: name,
  };
};

export const clearOrder = () => {
  return {
    type: actionTypes.CLEAR_ORDER,
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

// async action creator

export const initIngredients = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS,
  };
};
