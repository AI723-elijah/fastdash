import { handleActions } from 'redux-actions';
import * as actions from '../Constants/Constants';
const initialState = {
  siteMap: []
};


const handlers = {
  [actions.GET_SITE_MAP_SUCCESS]: (state, action) => ({ ...state, siteMap: action.payload }),
  [actions.GET_SITE_MAP_FAILURE]: (state, action) => ({ ...state, siteMap: [] }),
};

const siteMapReducer = handleActions(handlers, initialState);
export { siteMapReducer };
