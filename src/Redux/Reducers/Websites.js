import { handleActions } from 'redux-actions';
import * as actions from '../Constants/Constants';

const initialState = {
    websites: [],
    rep: {},
    
};
const handlers = {
    [actions.GET_WEBSITES_SUCCESS]: (state, action) => ({...state, websites: action.payload.data}),
    [actions.UPDATE_WEBSITE_SUCCESS]: (state, action) => ({ ...state, rep: action.payload }),
    [actions.EDIT_REP]: (state, action) => ({ ...state, rep: action.payload }),
};

const websitesReducer = handleActions(handlers, initialState);
export { websitesReducer };