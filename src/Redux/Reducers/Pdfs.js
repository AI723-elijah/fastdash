import { handleActions } from 'redux-actions';
import * as actions from '../Constants/Constants';

const initialState = {
  pdfs: [],
  rep: {}
};

const setValues = (payload, state) => {
  return {
    ...state.rep,
    [payload.name]: payload.value
  };
};

const handlers = {
  [actions.PDFS_GET_SUCCESS]: (state, action) => ({ ...state, pdfs: action.payload }),
  [actions.EDIT_REP]: (state, action) => ({ ...state, rep: action.payload }),
  [actions.PDF_UPDATE_SUCCESS]: (state, action) => ({ ...state, rep: setValues(action.payload, state) })
};

const pdfsReducer = handleActions(handlers, initialState);
export { pdfsReducer };
