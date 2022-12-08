import { handleActions } from 'redux-actions';
import * as actions from '../Constants/Constants';

const initialState = {
    coupons: [],
    rep: {}
};
const handlers = {
    [actions.GET_COUPONS_SUCCESS]: (state, action) => ({...state, coupons: action.payload.data}),
    [actions.UPDATE_COUPON_SUCCESS]: (state, action) => ({ ...state, rep: action.payload }),
    [actions.EDIT_REP]: (state, action) => ({ ...state, rep: action.payload }),
};

const couponsReducer = handleActions(handlers, initialState);
export { couponsReducer };