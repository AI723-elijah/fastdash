import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const editRep = params => dispatch => {
  dispatch({
    type: types.EDIT_REP,
    payload: params
  })
}

export const getCoupons = () => {
  let options = { url: 'coupons/' };
  options.types = [
    types.GET_COUPONS_SUCCESS,
    types.GET_COUPONS_FAILURE
  ]

  return api.get(options);
}

export const createCoupon = (payload) => {
  let options = { url: 'coupons/' };
  options.types = [
    types.ADD_COUPON_SUCCESS,
    types.ADD_COUPON_FAILURE
  ]

  return api.post(options, payload);
}

export const updateCoupon = (payload) => {
  let options = { url: 'coupons/' };
  options.types = [
    types.UPDATE_COUPON_SUCCESS,
    types.UPDATE_COUPON_FAILURE
  ]

  return api.put(options, payload);
}

export const deleteCoupon = (payload) => {
  let options = { url: 'coupons/' };
  options.types = [
    types.DELETE_COUPON_SUCCESS,
    types.DELETE_COUPON_FAILURE
  ]

  return api.put(options, payload);
}