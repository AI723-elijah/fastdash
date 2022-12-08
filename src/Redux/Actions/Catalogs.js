import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const editRep = params => dispatch => {
  dispatch({
    type: types.EDIT_REP,
    payload: params
  })
}
export const getCatalogs = () => {
  let options = { url: 'catalogs/' };
  options.types = [
    types.ICONS_GET_SUCCESS,
    types.ICONS_GET_FAILURE
  ]

  return api.get(options);
};

export const saveCatalogs = params => {
  let options = { url: 'catalogs/' };
  options.types = [
    types.CATALOGS_SAVE_SUCCESS,
    types.CATALOG_SAVE_FAILURE
  ]

  return api.post(options, params);
};

export const updateCatalogs = params => {
  let options = { url: 'catalogs/' };
  options.types = [
    types.CATALOGS_UPDATE_SUCCESS,
    types.CATALOG_UPDATE_FAILURE
  ]

  return api.put(options, params);
}

export const deleteCatalogs = params => {
  let options = { url: `catalogs/${params}` };
  options.types = [
    types.CATALOGS_DELETE_SUCCESS,
    types.CATALOG_DELETE_FAILURE
  ]

  return api.delete(options, params);
}