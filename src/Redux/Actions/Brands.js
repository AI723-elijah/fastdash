import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const editRep = params => dispatch => {
  dispatch({
    type: types.EDIT_REP,
    payload: params
  })
}

export const getBrands = () => {
  let options = { url: 'brands/' };
  options.types = [
    types.ICONS_GET_SUCCESS,
    types.ICONS_GET_FAILURE
  ]

  return api.get(options);
};

export const saveBrands = params => {
  let options = { url: 'brands/' };
  options.types = [
    types.ICON_SAVE_SUCCESS,
    types.ICON_SAVE_FAILURE
  ]

  return api.post(options, params);
};

export const updateBrand = params => {
  let options = { url: 'brands/' };
  options.types = [
    types.ICON_SAVE_SUCCESS,
    types.ICON_SAVE_FAILURE
  ]

  return api.put(options, params);
};

export const deleteBrand = id => {
  let options = { url: `brands/${id}` };
  options.types = [
    types.BANNER_DELETE_SUCCESS,
    types.BANNER_DELETE_FAILURE
  ]

  return api.delete(options);
};