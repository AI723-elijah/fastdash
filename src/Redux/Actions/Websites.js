import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const editRep = params => dispatch => {
  dispatch({
    type: types.EDIT_REP,
    payload: params
  })
}

export const getWebsites = () => {
  let options = { url: 'websites/' };
  options.types = [
    types.GET_WEBSITES_SUCCESS,
    types.GET_WEBSITES_FAILURE
  ]

  return api.get(options);
}

export const createCoupon = (payload) => {
  let options = { url: 'websites/' };
  options.types = [
    types.ADD_WEBSITE_SUCCESS,
    types.ADD_WEBSITE_FAILURE
  ]

  return api.post(options, payload);
}

export const updateCoupon = (payload) => {
  let options = { url: 'websites/' };
  options.types = [
    types.UPDATE_WEBSITE_SUCCESS,
    types.UPDATE_WEBSITE_FAILURE
  ]

  return api.put(options, payload);
}

export const deleteCoupon = (payload) => {
  let options = { url: 'websites/' };
  options.types = [
    types.DELETE_WEBSITE_SUCCESS,
    types.DELETE_WEBSITE_FAILURE
  ]

  return api.put(options, payload);
}

