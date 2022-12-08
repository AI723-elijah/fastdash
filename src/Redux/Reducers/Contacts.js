import { handleActions } from 'redux-actions';
import * as actions from '../Constants/Constants';

const initialState = {
  contacts: []
};

const handlers = {
  [actions.GET_CONTACTS_SUCCESS]: (state, action) => ({ ...state, contacts: action.payload })
};

const contactsReducer = handleActions(handlers, initialState);
export { contactsReducer };
