import { handleActions } from 'redux-actions';

const initialState = {
  services: [],
  service: {}
};

const handlers = {
  'GET_SERVICE_SUCCESS': (state, action) => ({ ...state, services: action.payload }),
  'EDIT_SERVICE': (state, action) => ({ ...state, service: action.payload }),
};

const servicesReducer = handleActions(handlers, initialState);
export { servicesReducer };
