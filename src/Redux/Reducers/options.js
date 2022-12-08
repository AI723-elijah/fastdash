import { handleActions } from 'redux-actions';
import * as actions from '../Constants/Constants';

const initialState = {
  options: [],
  parentProducts: [],
  childProducts: [],
  optionProducts: null
};
const getParentProducts = payload => {
  return payload.filter(p => p.type === 'Parent')
}

const getChildProducts = payload => {
  return payload.filter(p => p.type === 'Child')
}
const updateOptionAfterAdd = (payload, state) => {
  const index = state.options.findIndex(item => item.productID === payload.productID);
  if (index > -1) {
    const docIdx = state.options[index].documents.findIndex(op => op.type === payload.type);
    if (docIdx > -1) {
      state.options[index].documents[docIdx] = payload;
    }
  }
  return state.options
}

const handlers = {
  [actions.ADD_OPTIONS_SUCCESS]: (state, action) => {
    // const oldOptions = state.options;
    // let newOptions = [...oldOptions];
    // newOptions.push(action.payload);
    return { ...state }
  },
  [actions.ADD_OPTIONS_FAILURE]: (state) => ({ ...state }),
  [actions.GET_OPTIONS_SUCCESS]: (state, action) => ({ ...state, options: action.payload }),
  [actions.GET_OPTIONS_FAILURE]: (state) => ({ ...state }),
  [actions.DELETE_OPTION_SUCCESS]: (state) => ({ ...state }),
  [actions.DELETE_OPTION_FAILURE]: (state) => ({ ...state }),
  [actions.UPDATE_OPTION_SUCCESS]: (state) => ({ ...state }),
  [actions.UPDATE_OPTION_FAILURE]: (state) => ({ ...state }),
  [actions.GET_ALL_PRODUCTS_IN_SYSTEM_SUCCESS]: (state, action) => ({
    ...state,
    parentProducts: getParentProducts(action.payload),
    childProducts: getChildProducts(action.payload)
  }),
  [actions.GET_ALL_PRODUCTS_IN_SYSTEM_FAILURE]: (state) => ({ ...state }),
  [actions.GET_PRODUCTS_BY_OPTION_SUCCESS]: (state, action) => ({ ...state, optionProducts: action.payload }),
  [actions.GET_PRODUCTS_BY_OPTION_FAILURE]: (state) => ({ ...state }),
  [actions.RESET_SELECTED_OPTION_PRODUCTS]: (state) => ({ ...state, optionProducts: null }),
  [actions.UPDATE_OPTION_DOCUMENT_SUCCESS]: (state, action) => ({ ...state, options: updateOptionAfterAdd(action.payload, state) }),
  [actions.UPDATE_OPTION_DOCUMENT_FAILURE]: (state) => ({ ...state })

};

const optionsReducer = handleActions(handlers, initialState);
export { optionsReducer };