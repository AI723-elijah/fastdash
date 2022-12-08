import { handleActions } from 'redux-actions';
import * as actions from '../Constants/Constants';

const initialState = {
    slideIns: [],
    rep: {},
    categories: []
};

const setValues = (payload, state) => {
    return {
        ...state.rep,
        [payload.name]: payload.value
    };
};

const handlers = {
    [actions.SLIDE_IN_GET_SUCCESS]: (state, action) => ({ ...state, slideIns: action.payload }),
    [actions.CATEGORIES_GET_SUCCESS]: (state, action) => ({ ...state, categories: action.payload }),
    [actions.EDIT_REP]: (state, action) => ({ ...state, rep: action.payload }),
    [actions.CHANGE_REP]: (state, action) => ({ ...state, rep: setValues(action.payload, state) })
};

const slideInReducer = handleActions(handlers, initialState);
export { slideInReducer };