import { handleActions } from 'redux-actions';
import * as actions from '../Constants/Constants';
import { addKey } from '../../Common/addKey';

const initialState = {
  banners: [],
  rep: {}
};

const setValues = (payload, state) => {
  return {
    ...state.rep,
    [payload.name]: payload.value
  };
};

const handlers = {
  [actions.BANNERS_GET_SUCCESS]: (state, action) =>
    ({ ...state, banners: addKey([...action.payload]) }),
    [actions.EDIT_REP]: (state, action) => ({ ...state, rep: action.payload }),
  [actions.CHANGE_REP]: (state, action) => ({ ...state, rep: setValues(action.payload, state) })
};

const bannerReducer = handleActions(handlers, initialState);
export { bannerReducer };
