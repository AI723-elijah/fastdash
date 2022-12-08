import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const editRep = params => dispatch => {
  dispatch({
    type: types.EDIT_REP,
    payload: params
  })
}

export const getBanners = () => {
  let options = { url: 'banners/' };
  options.types = [
    types.BANNERS_GET_SUCCESS,
    types.BANNERS_GET_FAILURE
  ]

  return api.get(options);
};

export const saveBanner = params => {
  let options = { url: 'banners/' };
  options.types = [
    types.BANNER_SAVE_SUCCESS,
    types.BANNER_SAVE_FAILURE
  ]

  return api.post(options, params);
};

export const deleteBanner = id => {
  let options = { url: `banners/${id}` };
  options.types = [
    types.BANNER_DELETE_SUCCESS,
    types.BANNER_DELETE_FAILURE
  ]

  return api.delete(options);
};

export const updateBanner = (params) => {
  let options = { url: `banners` };
  options.types = [
    types.BANNER_UPDATE_SUCCESS,
    types.BANNER_UPDATE_FAILURE
  ]

  return api.put(options, params);
};
