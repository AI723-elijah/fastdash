import { handleActions } from 'redux-actions';
import * as actions from '../Constants/Constants';

const initialState = {
  salesReps: [],
  rep: {}
};

const setValues = (payload, state) => {
  return {
    ...state.rep,
    [payload.name]: payload.value
  };
};

const handlers = {
  [actions.GET_SALESREPS_SUCCESS]: (state, action) => ({ ...state, salesReps: action.payload.map(e => ({ ...e, key: e.ID })) }),
  [actions.EDIT_REP]: (state, action) => ({ ...state, rep: action.payload }),
  [actions.CHANGE_REP]: (state, action) => ({ ...state, rep: setValues(action.payload, state) })
};

const salesReducer = handleActions(handlers, initialState);
export { salesReducer };
