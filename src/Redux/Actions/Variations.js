import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const saveSearchCriteria = str => dispatch => {
  return dispatch({
    type: types.SAVE_VARIATION_QUERY,
    payload: str
  })
}

export const handleVariationChange = (value, attribute, destination, i) => dispatch => {
  const data = {
    value, attribute, destination, i
  }
  return dispatch({
    type: types.CHANGE_VARIATION,
    payload: data
  });
};

export const changeAttributeKey = (name, index, attributes) => dispatch => {
  const attribute = attributes.find(e => e.attribute.attributeName === name);
  const data = {
    name, index, attribute
  }
  return dispatch({
    type: 'ATTRIBUTE_KEY',
    payload: data
  });
};

export const addNewItem = (params, destination) => dispatch => {
  const data = { params, destination };
  return dispatch({
    type: 'ADD_ITEM',
    payload: data
  });
};

export const selectCategory = (value, id) => dispatch => {
  const data = {
    value, id
  }
  return dispatch({
    type: 'SELECT_CATEGORY',
    payload: data
  });
}

export const getVariation = id => {
  let options = { url: `products/variations/${id}` };
  options.types = [
    types.VARIATION_GET_SUCCESS,
    types.VARIATION_GET_FAILURE
  ]

  return api.get(options);
};

export const updateVariation = params => {
  let options = { url: `products/variations/${params.productID}` };
  options.types = [
    types.VARIATION_UPDATE_SUCCESS,
    types.VARIATION_UPDATE_FAILURE
  ]

  return api.put(options, params);
};

export const searchVariations = (str, skip) => {
  let options = { url: `products/search-variation?str=${str}&skip=${skip}` };
  options.types = [
    types.SEARCH_VARIATION_SUCCESS,
    types.SEARCH_VARIATION_FAILURE
  ]

  return api.get(options);
};
