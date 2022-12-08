import { handleActions } from 'redux-actions';
import * as actions from '../Constants/Constants';

const initialState = {
  email: '',
  error: '',
};

const handlers = {
  [actions.LOGIN_SUCCESS]: (state, action) => {
    const { user, cUser, userToken } = action.payload
    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('userRole', cUser.role);
    localStorage.setItem('newUser', cUser.new);
    localStorage.setItem('userToken', userToken);
    return { ...state, email: action.payload }
  },
  [actions.LOGIN_FAILURE]: (state, action) => {
    return { ...state, error: action.payload.response.data.error || 'Login Failed!' }
  },
  [actions.CHANGE_USER_PASSWORD_FAILURE]: (state, action) => ({ ...state, error: action.payload }),
};

const authReducer = handleActions(handlers, initialState);
export { authReducer };
