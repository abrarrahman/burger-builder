import * as actionTypes from './actionTypes';
import { loadIngredients } from './index'
import axios from '../../axios-orders'

const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
}
const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}
const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}
export const initPurchase = () => {
  return {
    type: actionTypes.INIT_PURCHASE
  }
}
export const tryPurchaseBurger = (order, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json?auth=' + token, order)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, order));
        dispatch(loadIngredients())
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error))
      });
  }
}
const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}
const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
  }
}
const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error
  }
}
export const tryFetchOrder = (token,userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"'
    axios.get('/orders.json' + queryParams)
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      })
  }
}