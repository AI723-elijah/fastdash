import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const editRep = params => dispatch => {
  dispatch({
    type: types.EDIT_REP,
    payload: params
  })
}

export const changeRep = obj => dispatch => {
  dispatch({
    type: types.CHANGE_REP,
    payload: obj
  })
}

export const getSalesReps = () => {
  let options = { url: 'salesreps/' };
  options.types = [
    types.GET_SALESREPS_SUCCESS,
    types.GET_SALESREPS_FAILURE
  ]

  return api.get(options);
}

export const saveSalesReps = params => {
  let options = { url: 'salesreps/' };
  options.types = [
    types.SAVE_SALESREPS_SUCCESS,
    types.SAVE_SALESREPS_FAILURE
  ]

  return api.post(options, params);
}

export const updateSalesReps = params => {
  let options = { url: `salesreps/${params.ID}` };
  options.types = [
    types.UPDATE_SALESREPS_SUCCESS,
    types.UPDATE_SALESREPS_FAILURE
  ]

  return api.put(options, params);
}

export const bulkUpload = params => {
  let options = { url: 'salesreps/bulk-create/' };
  options.types = [
    types.BULK_SALESREPS_SUCCESS,
    types.BULK_SALESREPS_FAILURE
  ]

  return api.post(options, params);
}
