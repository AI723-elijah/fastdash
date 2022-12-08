import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const editRep = params => dispatch => {
  dispatch({
    type: types.EDIT_REP,
    payload: params
  })
}

export const getUsersList = () => {
  let options = { url: 'users/' };
  options.types = [
    types.GET_USERS_SUCCESS,
    types.GET_USERS_FAILURE
  ]

  return api.get(options);
}

export const createNewUser = (payload) => {
  let options = { url: 'users/' };
  options.types = [
    types.ADD_USER_SUCCESS,
    types.ADD_USER_FAILURE
  ]

  return api.post(options, payload);
}

export const updateUser = (payload) => {
  let options = { url: 'users/' };
  options.types = [
    types.UPDATE_USER_SUCCESS,
    types.UPDATE_USER_FAILURE
  ]

  return api.put(options, payload);
}

export const getUserDetails = ({ userID }) => {
  let options = { url: `users/${userID}` };
  options.types = [
    types.GET_USER_DETAIL_SUCCESS,
    types.GET_USER_DETAIL_FAILURE
  ]

  return api.put(options);
}

export const resetUserPassword = (payload) => {
  let options = { url: `users/resetpassword` };
  options.types = [
    types.RESET_USER_PASSWORD_SUCCESS,
    types.RESET_USER_PASSWORD_FAILURE
  ]

  return api.post(options, payload);
}

export const sendVerifiedUserEmail = (body) => {
  let options = { url: `users/verified/users/all`}
  options.types = [
    types.VERIFY_SEND_USERS_EMAIL_SUCCESS,
    types.VERIFY_SEND_USERS_EMAIL_FAILURE
  ]

  return api.post(options, body);
}

export const sendRepApprovedEmail = (body) => {
  let options = { url: `users/approved/rep`}
  options.types = [
    types.SEND_APPROVED_REP_EMAIL_SUCCESS,
    types.SEND_APPROVED_REP_EMAIL_FAILURE
  ]

  return api.post(options, body);
}

export const sendRepDeclinedEmail = (body) => {
  let options = { url: `users/declined/rep`}
  options.types = [
    types.SEND_DECLINED_REP_EMAIL_SUCCESS,
    types.SEND_DECLINED_REP_EMAIL_FAILURE
  ]

  return api.post(options, body);
}