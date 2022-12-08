import { handleActions } from 'redux-actions';
import * as actions from '../Constants/Constants';

const initialState = {
  storeLocators: [],
  onlineStores: [],
  rep: {}
};

const setValues = (payload, state) => {
  return {
    ...state.rep,
    [payload.name]: payload.value
  };
};

const handlers = {
  [actions.STORE_LOCATOR_SUCCESS]: (state, action) => ({ ...state, storeLocators: action.payload }),
  [actions.EDIT_REP]: (state, action) => ({ ...state, rep: action.payload }),
  [actions.CHANGE_REP]: (state, action) => ({ ...state, rep: setValues(action.payload, state) }),
  [actions.ONLINE_RETAILERS_SUCCESS]: (state, action) => ({ ...state, onlineStores: action.payload })
};

const storeLocatorsReducer = handleActions(handlers, initialState);
export { storeLocatorsReducer };