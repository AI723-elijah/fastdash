import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const deleteAccessory = id => {
  let options = { url: `product-accessories/${id}` };
  options.types = [
    types.DELETE_ACCESSORY_SUCCESS,
    types.DELETE_ACCESSORY_FAILURE
  ]
  return api.delete(options);
}
