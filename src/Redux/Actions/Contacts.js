import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const getContacts = () => {
  let options = { url: 'contacts/' };
  options.types = [
    types.GET_CONTACTS_SUCCESS,
    types.GET_CONTACTS_FAILURE
  ]

  return api.get(options);
};

export const createContact = params => {
  let options = { url: 'contacts/' };
  options.types = [
    types.CREATE_CONTACTS_SUCCESS,
    types.CREATE_CONTACTS_FAILURE
  ]

  return api.post(options, params);
};

export const updateContact = (data) => {
  let options = { url: `contacts/` };
  options.types = [
    types.UPDATE_CONTACTS_SUCCESS,
    types.UPDATE_CONTACTS_FAILURE
  ]

  return api.put(options, data);
};
