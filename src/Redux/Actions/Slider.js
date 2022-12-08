import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const editRep = params => dispatch => {
  dispatch({
    type: types.EDIT_REP,
    payload: params
  })
}


export const getSliders = () => {
  let options = { url: 'slider/' };
  options.types = [
    types.SLIDERS_GET_SUCCESS,
    types.SLIDERS_GET_FAILURE
  ]

  return api.get(options);
};

export const saveSlider = params => {
  let options = { url: 'slider/' };
  options.types = [
    types.SLIDER_SAVE_SUCCESS,
    types.SLIDER_SAVE_FAILURE
  ]

  return api.post(options, params);
};

export const deleteSlider = id => {
  let options = { url: `slider/${id}` };
  options.types = [
    types.SLIDER_DELETE_SUCCESS,
    types.SLIDER_DELETE_FAILURE
  ]

  return api.delete(options);
};

export const updateSlider = (params) => {
  let options = { url: `slider` };
  options.types = [
    types.BANNER_UPDATE_SUCCESS,
    types.BANNER_UPDATE_FAILURE
  ]

  return api.put(options, params);
}