import { api } from '../../Services/api';
import { authorization } from '../../Services/auth';
import * as types from '../Constants/Constants';

export const editRep = params => dispatch => {
  dispatch({
    type: types.EDIT_REP,
    payload: params
  })
}

export const getPdfs = () => {
  let options = { url: 'pdfs/' };
  options.types = [
    types.PDFS_GET_SUCCESS,
    types.PDFS_GET_FAILURE
  ]

  return api.get(options);
};

export const addPdf = params => {
  let options = { url: 'pdfs/' };
  options.types = [
    types.PDF_SAVE_SUCCESS,
    types.PDF_SAVE_FAILURE
  ]

  return api.post(options, params);
};

export const updatePdf = params => {
  let options = { url: 'pdfs/' };
  options.types = [
    types.PDF_UPDATE_SUCCESS,
    types.PDF_UPDATE_FAILURE
  ]

  return api.put(options, params);
};

export const deletePdf = id => {
  let options = { url: `pdfs/${id}` };
  options.types = [
    types.PDF_DELETE_SUCCESS,
    types.PDF_DELETE_FAILURE
  ]

  return api.delete(options);
};

export const ChangePdfPassword = (body) => {
  let options = {
    currentPassword: body.currentPassword,
    newPassword: body.newPassword
  };
  options.types = [
    types.PDF_CHANGE_PASSWORD_SUCCESS,
    types.PDF_CHANGE_PASSWORD_FAILURE
  ]

  return authorization.changPDFPassword(options);
};

export const verifyPDF = (password) => {
  let options = {
    password: password
  };
  options.types = [
    types.VERIFY_PDF_SUCCESS,
    types.VERIFY_PDF_FAILURE
  ]

  return authorization.verifyPDF(options);
};