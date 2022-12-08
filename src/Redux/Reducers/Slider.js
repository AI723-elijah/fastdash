import { handleActions } from 'redux-actions';
import * as actions from '../Constants/Constants';
import { addKey } from '../../Common/addKey';

const initialState = {
  sliders: [],
  rep: {}
};

const setValues = (payload, state) => {
  return {
    ...state.rep,
    [payload.name]: payload.value
  };
};

const handlers = {
  [actions.SLIDERS_GET_SUCCESS]: (state, action) =>
    ({ ...state, sliders: addKey([...action.payload]) }),
  [actions.EDIT_REP]: (state, action) => ({ ...state, rep: action.payload }),
  [actions.CHANGE_REP]: (state, action) => ({ ...state, rep: setValues(action.payload, state) })
};

const sliderReducer = handleActions(handlers, initialState);
export { sliderReducer };
