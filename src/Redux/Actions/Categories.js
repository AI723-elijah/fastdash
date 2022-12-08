import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const getCategories = () => {
  let options = { url: 'channels/categories/' };
  options.types = [
    types.CATEGORIES_GET_SUCCESS,
    types.CATEGORIES_GET_FAILURE
  ]

  return api.get(options);
}

export const saveCategory = (params) => {
  let options = { url: 'channels/categories/' };
  options.types = [
    types.CATEGORIES_SAVE_SUCCESS,
    types.CATEGORIES_SAVE_FAILURE
  ]

  return api.post(options, params);
}

export const updateCategory = (params) => {
  let options = { url: `channels/categories/${params.channelCategoryID}` };
  options.types = [
    types.CATEGORIES_UPDATE_SUCCESS,
    types.CATEGORIES_UPDATE_FAILURE
  ]

  return api.put(options, params);
}

export const removeCategory = (id) => {
  let options = { url: `channels/categories/${id}` };
  options.types = [
    types.CATEGORIES_DELETE_SUCCESS,
    types.CATEGORIES_DELETE_FAILURE
  ]

  return api.delete(options);
}
