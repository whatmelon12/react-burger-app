import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseInit = () => ({ type: actionTypes.PURCHASE_INIT });

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then(response =>
        dispatch(purchaseBurgerSuccess(response.data.name, orderData))
      )
      .catch(error => dispatch(purchaseBurgerFail(error)));
  };
};

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START
});

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData
});

export const purchaseBurgerFail = error => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error
});

export const fetchOrderStart = () => ({ type: actionTypes.FETCH_ORDERS_START });

export const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders
});

export const fetchOrdersFail = error => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error
});

export const fetchOrders = token => {
  return dispatch => {
    dispatch(fetchOrderStart());
    axios
      .get("/orders.json?auth=" + token)
      .then(response => {
        const orders = [];
        for (let key in response.data) {
          orders.push({ id: key, ...response.data[key] });
        }
        dispatch(fetchOrdersSuccess(orders));
      })
      .catch(error => dispatch(fetchOrdersFail(error)));
  };
};
