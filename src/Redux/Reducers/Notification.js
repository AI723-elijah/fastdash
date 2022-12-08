import { handleActions } from "redux-actions";
import * as actions from '../Constants/Constants';

const initialState = {
  notifications: []
};

const handlers = {
  [actions.NOTIFICATIONS_GET_SUCCESS]: (state, action) => ({ ...state, notifications: action.payload })
};

const notificationReducer = handleActions(handlers, initialState);
export { notificationReducer };
