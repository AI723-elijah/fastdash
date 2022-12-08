import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const editRep = params => dispatch => {
  dispatch({
    type: types.EDIT_REP,
    payload: params
  })
}

export const getLiteratures = () => {
  let options = { url: 'literatures/' };
  options.types = [
    types.ICONS_GET_SUCCESS,
    types.ICONS_GET_FAILURE
  ]

  return api.get(options);
};

export const saveLiteratures = params => {
  let options = { url: 'literatures/' };
  options.types = [
    types.LITERATURE_SAVE_SUCCESS,
    types.LITERATURE_SAVE_FAILURE
  ]

  return api.post(options, params);
};

export const updateLiteratures = params => {
  let options = { url: 'literatures/' };
  options.types = [
    types.LITERATURE_UPDATE_SUCCESS,
    types.LITERATURE_UPDATE_FAILURE
  ]

  return api.put(options, params);
};

export const updateLiteraturesSort = payload => {
  let options = { url: `literatures/${payload.id}` };
  options.types = [
    types.UPDATE_PROMOTIONAL_LITRATURE_SORT_SUCCESS,
    types.UPDATE_PROMOTIONAL_LITRATURE_SORT_FAILURE
  ]
  return api.put(options, payload);
};

export const deleteLiteratures = params => {
  let options = { url: `literatures/${params}` };
  options.types = [
    types.LITERATURE_DELETE_SUCCESS,
    types.LITERATURE_DELETE_FAILURE
  ]

  return api.delete(options, params);
};
