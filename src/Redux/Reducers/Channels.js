import { handleActions } from 'redux-actions';
import * as actions from '../Constants/Constants';

const initialState = {
  channels: []
};

const handlers = {
  [actions.CHANNELS_GET_SUCCESS]: (state, action) => ({ ...state, channels: action.payload })
};

const channelReducer = handleActions(handlers, initialState);
export { channelReducer };
