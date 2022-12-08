import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const editRep = params => dispatch => {
  dispatch({
    type: types.EDIT_REP,
    payload: params
  })
}

export const getVideos = () => {
  let options = { url: 'videos/' };
  options.types = [
    types.ICONS_GET_SUCCESS,
    types.ICONS_GET_FAILURE
  ]

  return api.get(options);
};

export const updateVideosSort = payload => {
  let options = { url: `videos/${payload.id}` };
  options.types = [
    types.UPDATE_VIDEO_SORT_SUCCESS,
    types.UPDATE_VIDEO_SORT_FAILURE
  ]
  return api.put(options, payload);
};

export const saveVideos = params => {
  let options = { url: 'videos/' };
  options.types = [
    types.VIDEOS_SAVE_SUCCESS,
    types.VIDEOS_SAVE_FAILURE
  ]

  return api.post(options, params);
};

export const updateVideos = params => {
  let options = { url: 'videos/' };
  options.types = [
    types.VIDEOS_UPDATE_SUCCESS,
    types.VIDEOS_UPDATE_FAILURE
  ]

  return api.put(options, params);
};

export const deleteVideos = params => {
  let options = { url: `videos/${params}` };
  options.types = [
    types.VIDEOS_DELETE_SUCCESS,
    types.VIDEOS_DELETE_FAILURE
  ]

  return api.delete(options, params);
};
