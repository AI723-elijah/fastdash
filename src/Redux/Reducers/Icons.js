import { handleActions } from 'redux-actions';
import * as actions from '../Constants/Constants';

const initialState = {
  icons: []
};

const handlers = {
  [actions.ICONS_GET_SUCCESS]: (state, action) => ({ ...state, icons: action.payload }),
  [actions.ICON_UPDATE_SUCCESS]: (state, action) => ({ ...state, icons: [...state.icons, action.payload] }),
  [actions.ICON_DELETE_SUCCESS]: (state, action) => ({ ...state, icons: state.icons.filter(icon => icon.iconID !== action.payload.iconID) })
};

const iconsReducer = handleActions(handlers, initialState);
export { iconsReducer };