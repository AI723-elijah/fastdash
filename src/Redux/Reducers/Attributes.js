import { handleActions } from 'redux-actions';
import * as actions from '../Constants/Constants';

const initialState = {
  list: [],
  attributes: [],
  selectedAttributes: [],
  dropdown: []
};

const createAttributes = (payload) => {
  let attributes = [];

  attributes = payload.map(a => {
    return {
      ...a,
      attribute: {
        attributeName: a.attributeName,
        attributeID: a.attributeID,
        type: a.type,
        category: a.category
      },
      value: '',
      sharedFlag: 0
    }
  });

  return attributes;
};

const searchAttributes = (state, payload) => {
  if(payload) {
    return state.list.filter(e => e.attributeName.toLowerCase().indexOf(payload.toLowerCase()) > -1);
  }

  return state.list;
}

const selectedAttribute = (payload) => {
return payload.filter(p=>p.syncStatus===true);
}
const handlers = {
  [actions.ATTRIBUTE_GET_SUCCESS]: (state, action) =>
    ({ ...state, attributes: createAttributes(action.payload), list: createAttributes(action.payload), selectedAttributes: selectedAttribute(action.payload) }),
  [actions.SELECTED_ATTRIBUTE_SET_SUCCESS]: (state, action) =>
    ({ ...state, selectedAttributes: action.payload.syncStatus ? [...state.selectedAttributes, action.payload] : state.selectedAttributes.filter(sa=>sa.attributeID!==action.payload.attributeID)}),
  [actions.DROPDOWN_VALUES_SUCCESS]: (state, action) =>
    ({ ...state, dropdown: action.payload }),
  [actions.SEARCH_ATTRIBUTES]: (state, action) =>
    ({ ...state, attributes: searchAttributes(state, action.payload) })
};

const attributeReducer = handleActions(handlers, initialState);
export { attributeReducer };
