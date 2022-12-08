import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const getOrders = (page = 1, limit = 20, query = '') => {
  let options = { url: `orders?page=${page}&limit=${limit}&query=${query}` };
  options.types = [
    types.GET_ORDERS_SUCCESS,
    types.GET_ORDERS_FALIURE
  ]
  return api.get(options);
};

export const deleteOrder = (id) => {
  let options = { url: `orders?id=${id}` };
  options.types = [
    types.DELETE_ORDERS_SUCCESS,
    types.DELETE_ORDERS_FALIURE
  ]
  return api.delete(options);
};