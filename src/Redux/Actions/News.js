import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const editRep = params => dispatch => {
  dispatch({
    type: types.EDIT_REP,
    payload: params
  })
}

export const getNews = () => {
  let options = { url: 'news/' };
  options.types = [
    types.ICONS_GET_SUCCESS,
    types.ICONS_GET_FAILURE
  ]

  return api.get(options);
};

export const saveNews = params => {
  let options = { url: 'news/' };
  options.types = [
    types.NEWS_SAVE_SUCCESS,
    types.NEWS_SAVE_FAILURE
  ]

  return api.post(options, params);
};

export const updateNews = params => {
  let options = { url: 'news/' };
  options.types = [
    types.NEWS_SAVE_SUCCESS,
    types.NEWS_SAVE_FAILURE
  ]

  return api.put(options, params);
};

export const deleteNews = params => {
  let options = { url: `news/${params}` };
  options.types = [
    types.NEWS_DELETE_SUCCESS,
    types.NEWS_DELETE_FAILURE
  ]

  return api.delete(options, params);
};
