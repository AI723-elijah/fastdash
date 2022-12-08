import { handleActions } from 'redux-actions';
import * as actions from '../Constants/Constants';

const initialState = {
  list: [],
  suppliers: []
};

const searchSuppliers = (state, payload) => {
  if(payload) {
    return state.list.filter(e => e.supplierName.toLowerCase().indexOf(payload.toLowerCase()) > -1);
  }

  return state.list;
}

const handlers = {
  [actions.SUPPLIERS_GET_SUCCESS]: (state, action) => ({ ...state, suppliers: action.payload, list: action.payload }),
  [actions.SEARCH_SUPPLIERS]: (state, action) =>
    ({ ...state, suppliers: searchSuppliers(state, action.payload) })
};

const supplierReducer = handleActions(handlers, initialState);
export { supplierReducer };
