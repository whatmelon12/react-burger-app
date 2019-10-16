import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = ingredientName => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName
});

export const removeIngredient = ingredientName => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName
});

export const setIngedients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients
});

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const initIngredients = () => {
  return dispatch => {
    axios
      .get("/ingredients.json")
      .then(
        response => dispatch(setIngedients(response.data)),
        error => dispatch(fetchIngredientsFailed())
      );
  };
};
