import * as actions from '../Constants/Constants';

const INITIAL_STATE = {
  inventoryItems: null,
};
  
  const portalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case actions.INVENTORY_ITEMS_SUCCESS:
        return {
          ...state,
          inventoryItems: action.payload,
        };
      case actions.INVENTORY_ITEMS_FAILURE:
        return {
          ...state,
          inventoryItems: null,
        };
      default:
        return state;
    }
  };
  export { portalReducer };