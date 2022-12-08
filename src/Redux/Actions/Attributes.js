import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const searchAttributes = value => dispatch => {
  dispatch({
    type: types.SEARCH_ATTRIBUTES,
    payload: value
  });
};

export const getAttributes = () => {
  let options = { url: 'attributes/' };
  options.types = [
    types.ATTRIBUTE_GET_SUCCESS,
    types.ATTRIBUTE_GET_FAILURE
  ]

  return api.get(options);
};

export const setSelectedAttributes = value => dispatch => {
  dispatch({
    type: types.SELECTED_ATTRIBUTE_SET_SUCCESS,
    payload: value
  });
};

export const saveAttribute = params => {
  let options = { url: 'attributes/' };
  options.types = [
    types.ATTRIBUTE_SAVE_SUCCESS,
    types.ATTRIBUTE_SAVE_FAILURE
  ]

  return api.post(options, params);
};

export const deleteAttribute = id => {
  let options = { url: `attributes/${id}` };
  options.types = [
    types.ATTRIBUTE_DELETE_SUCCESS,
    types.ATTRIBUTE_DELETE_FAILURE
  ]

  return api.delete(options);
};

export const updateAttribute = params => {
  let options = { url: `attributes/${params.attributeID}` };
  options.types = [
    types.ATTRIBUTE_UPDATE_SUCCESS,
    types.ATTRIBUTE_UPDATE_FAILURE
  ]

  return api.put(options, params);
};
export const updateAttributeSort = params => {
  let options = { url: `attributes/updateSort` };
  options.types = [
    types.UPDATE_ATTRIBUTE_SORT_SUCCESS,
    types.UPDATE_ATTRIBUTE_SORT_FAILURE
  ]

  return api.put(options, params);
};
export const syncAttributesToSite = params => {
  let options = { url: `attributes/sync/` };
  options.types = [
    types.ATTRIBUTE_SYNC_SUCCESS,
    types.ATTRIBUTE_SYNC_FAILURE
  ]

  return api.post(options, params);
};

export const createAttributesMagento = params => {
  let options = { url: `attributes/create-mage/` };
  options.types = [
    types.ATTRIBUTE_CREATE_MAGE_SUCCESS,
    types.ATTRIBUTE_CREATE_MAGE_FAILURE,
  ]

  return api.post(options, params);
}


export const getDropDownValues = id => {
  let options = { url: `products/product-attribute/fetchDropDownValues?attributeID=${id}` };
  options.types = [
    types.DROPDOWN_VALUES_SUCCESS,
    types.DROPDOWN_VALUES_FAILURE
  ]

  return api.get(options, true);
};
