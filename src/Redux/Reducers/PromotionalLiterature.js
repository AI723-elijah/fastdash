import { handleActions } from 'redux-actions';
import * as actions from '../Constants/Constants';

const initialState = {
    literatures: [],
    rep: {}
};

const setValues = (payload, state) => {
  return {
    ...state.rep,
    [payload.name]: payload.value
  };
};

const handlers = {
  [actions.ICONS_GET_SUCCESS]: (state, action) => ({ ...state, literatures: action.payload }),
  [actions.EDIT_REP]: (state, action) => ({ ...state, rep: action.payload }),
  [actions.CHANGE_REP]: (state, action) => ({ ...state, rep: setValues(action.payload, state) })
};

const literaturesReducer = handleActions(handlers, initialState);
export { literaturesReducer };