import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const searchSuppliers = value => dispatch => {
  dispatch({
    type: types.SEARCH_SUPPLIERS,
    payload: value
  });
};

export const getSuppliers = () => {
  let options = { url: 'suppliers/' };
  options.types = [
    types.SUPPLIERS_GET_SUCCESS,
    types.SUPPLIERS_GET_FAILURE
  ]

  return api.get(options);
}

export const saveSupplier = (params) => {
  let options = { url: 'suppliers/' };
  options.types = [
    types.SUPPLIER_SAVE_SUCCESS,
    types.SUPPLIER_SAVE_FAILURE
  ]

  return api.post(options, params);
}
