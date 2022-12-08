import { handleActions } from 'redux-actions';
import * as actions from '../Constants/Constants';

const initialState = {
  loading: false,
  selectLoading: false
};

const handlers = {
  [actions.LOADING]: state => ({ ...state, loading: true }),
  [actions.SELECT_LOADING]: state => ({ ...state, selectLoading: true }),
  [actions.LOADING_COMPLETE]: state => ({ ...state, loading: false, selectLoading: false })
};

const loadingReducer = handleActions(handlers, initialState);
export { loadingReducer };