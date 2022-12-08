import { handleActions } from 'redux-actions';

const initialState = {
  items: [],
  item: {}
};

const handlers = {
  'GET_ITEMS_SUCCESS': (state, action) => ({ ...state, items: action.payload }),
  'EDIT_ITEM': (state, action) => ({ ...state, item: action.payload }),
};

const brandstoreReducer = handleActions(handlers, initialState);
export { brandstoreReducer };
