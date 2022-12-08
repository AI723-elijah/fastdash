import { handleActions } from 'redux-actions';
import * as actions from '../Constants/Constants';

const initialState = {
  query: '',
  orders: [],
  count: 0
};

const handlers = {
    [actions.GET_ORDERS_SUCCESS]: (state, action) => ({ ...state, count: action.payload.count, orders: action.payload.rows }),
    [actions.GET_ORDERS_FALIURE]: state => ({ ...state, orders: [] }),
    [actions.DELETE_ORDERS_SUCCESS]: (state, action) => ({ ...state }),
    [actions.DELETE_ORDERS_FALIURE]: state => ({ ...state }),
};

const ordersReducer = handleActions(handlers, initialState);
export { ordersReducer };