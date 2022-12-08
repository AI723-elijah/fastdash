import { authorization } from '../../Services/auth';
import * as types from '../Constants/Constants';
import { api } from './../../Services/api';

export const login = params => {
  let options = { url: 'auth/dashboard/login' };
  options.types = [
    types.LOGIN_SUCCESS,
    types.LOGIN_FAILURE
  ]

  return api.post(options, params)
  // return authorization.login(options);
};

export const changePassword = (params) => {
  let options = { ...params };
  options.types = [
    types.CHANGE_USER_PASSWORD_SUCCESS,
    types.CHANGE_USER_PASSWORD_FAILURE
  ]
  return authorization.changePassword(options);
}

export const logout = () => {
  return authorization.logout();
}
