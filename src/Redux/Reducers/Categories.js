import { handleActions } from 'redux-actions';
import * as actions from '../Constants/Constants';

const initialState = {
  categories: [],
  flattened: [],
  associatedTo: [],
  products: []
};

const compare = (a, b) => {
  return a.position - b.position;
}

const createTree = payload => {
  let tree = [], arrElem, mappedArr = {}, mappedElm;

  for(var i = 0, len = payload.length; i < len; i++) {
    arrElem = payload[i];
    arrElem.key = arrElem.channelCategoryID;
    mappedArr[arrElem.channelCategoryID] = arrElem;
    mappedArr[arrElem.channelCategoryID]['children'] = [];
  }

  // eslint-disable-next-line
  for(let i in mappedArr) {
    if (mappedArr && mappedArr.hasOwnProperty(i)) {
      mappedElm = mappedArr && mappedArr[i];
      if(mappedElm && mappedElm.parentID) {
        mappedArr && mappedArr[mappedElm.parentID] && mappedArr[mappedElm.parentID].children && mappedArr[mappedElm.parentID].children.push(mappedElm);
        mappedArr && mappedArr[mappedElm.parentID] && mappedArr[mappedElm.parentID].children && mappedArr[mappedElm.parentID].children.sort(compare);
      } else {
        tree.push(mappedElm)
      }
    }
  }

  tree.sort(compare);
  return tree;
}

const handlers = {
  [actions.CATEGORIES_GET_SUCCESS]: (state, action) => ({ ...state, categories: createTree(action.payload), flattened: action.payload }),
  [actions.GET_BY_CATEGORY_SUCCESS]: (state, action) => ({ ...state, associatedTo: action.payload }),
  [actions.QUICK_SEARCH_SUCCESS]: (state, action) => ({ ...state, products: action.payload })
};

const categoryReducer = handleActions(handlers, initialState);
export { categoryReducer };
