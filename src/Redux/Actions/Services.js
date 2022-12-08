import { api } from '../../Services/api';

export const editService = params => dispatch => {
  dispatch({
    type: 'EDIT_SERVICE',
    payload: params
  })
}

export const getServices = () => {
  let options = { url: 'services/' };
  options.types = [
    'GET_SERVICE_SUCCESS',
    'GET_SERVICE_FAILURE'
  ]

  return api.get(options);
};

export const createService = params => {
  let options = { url: 'services/' };
  options.types = [
    'CREATE_SERVICE_SUCCESS',
    'CREATE_SERVICE_FAILURE'
  ]

  return api.post(options, params);
};

export const updateService = params => {
  let options = { url: `services/${params.serviceID}` };
  options.types = [
    'UPDATE_SERVICE_SUCCESS',
    'UPDATE_SERVICE_FAILURE'
  ]

  return api.put(options, params);
};

export const deleteService = id => {
  let options = { url: `services/${id}` };
  options.types = [
    'DELETE_SERVICE_SUCCESS',
    'DELETE_SERVICE_FAILURE'
  ]

  return api.delete(options);
};
