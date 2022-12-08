import { api } from '../../Services/api';

export const editItem = params => dispatch => {
  dispatch({
    type: 'EDIT_ITEM',
    payload: params
  })
}

export const viewItems = () => {
  let options = { url: 'brandstore/' };
  options.types = [
    'GET_ITEMS_SUCCESS',
    'GET_ITEMS_FAILURE'
  ]

  return api.get(options);
};

export const createItem = params => {
  let options = { url: 'brandstore/' };
  options.types = [
    'CREATE_ITEM_SUCCESS',
    'CREATE_ITEM_FAILURE'
  ]

  return api.post(options, params);
};

export const updateItem = params => {
  let options = { url: `brandstore/${params.itemID}` };
  options.types = [
    'UPDATE_ITEM_SUCCESS',
    'UPDATE_ITEM_FAILURE'
  ]

  return api.put(options, params);
};

export const deleteItem = id => {
  let options = { url: `brandstore/${id}` };
  options.types = [
    'DELETE_ITEM_SUCCESS',
    'DELETE_ITEM_FAILURE'
  ]

  return api.delete(options);
};
