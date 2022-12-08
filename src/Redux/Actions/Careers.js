import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const editRep = params => dispatch => {
  dispatch({
    type: types.EDIT_REP,
    payload: params
  })
}

export const getCareers = () => {
  let options = { url: 'careers/' };
  options.types = [
    types.ICONS_GET_SUCCESS,
    types.ICONS_GET_FAILURE
  ]

  return api.get(options);
};

export const saveCareer = params => {
  let options = { url: 'careers/' };
  options.types = [
    types.CAREER_SAVE_SUCCESS,
    types.CAREER_SAVE_FAILURE
  ]

  return api.post(options, params);
};

export const updateCareer = params => {
  let options = { url: 'careers/' };
  options.types = [
    types.CAREER_SAVE_SUCCESS,
    types.CAREER_SAVE_FAILURE
  ]

  return api.put(options, params);
};

export const deleteCareer = params => {
  let options = { url: `careers/${params}` };
  options.types = [
    types.CAREER_DELETE_SUCCESS,
    types.CAREER_DELETE_FAILURE
  ]

  return api.delete(options, params);
};
