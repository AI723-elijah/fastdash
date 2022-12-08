import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const editRep = params => dispatch => {
  dispatch({
    type: types.EDIT_REP,
    payload: params
  })
}

export const getStoreLocators = () => {
  let options = { url: 'store/' };
  options.types = [
    types.STORE_LOCATOR_SUCCESS,
    types.STORE_LOCATOR_FAILURE
  ]

  return api.get(options);
};

export const saveStoreLocators = params => {
  let options = { url: 'store/' };
  options.types = [
    types.STORE_LOCATOR_SAVE_SUCCESS,
    types.STORE_LOCATOR_SAVE_FAILURE
  ]

  return api.post(options, params);
};

export const updateStoreLocators = params => {
  let options = { url: 'store/' };
  options.types = [
    types.STORE_LOCATOR_UPDATE_SUCCESS,
    types.STORE_LOCATOR_UPDATE_FAILURE
  ]

  return api.put(options, params);
};

export const deleteStoreLocators = params => {
  let options = { url: `store/${params}` };
  options.types = [
    types.STORE_LOCATOR_DELETE_SUCCESS,
    types.STORE_LOCATOR_DELETE_FAILURE
  ]

  return api.delete(options, params);
};

export const getOnlineRetailers = () => {
  const options = { url: '/store/getOnlineStores' };
  options.types = [
    types.ONLINE_RETAILERS_SUCCESS,
    types.ONLINE_RETAILERS_FAILURE
  ]

  return api.get(options);
}

