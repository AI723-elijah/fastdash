import { handleActions } from 'redux-actions';
import * as actions from '../Constants/Constants';

const initialState = {
  brands: [],
  rep: {}
};

const setValues = (payload, state) => {
  return {
    ...state.rep,
    [payload.name]: payload.value
  };
};

const handlers = {
  [actions.ICONS_GET_SUCCESS]: (state, action) => ({ ...state, brands: action.payload }),
  [actions.EDIT_REP]: (state, action) => ({ ...state, rep: action.payload }),
  [actions.CHANGE_REP]: (state, action) => ({ ...state, rep: setValues(action.payload, state) })
};

const brandsReducer = handleActions(handlers, initialState);
export { brandsReducer };