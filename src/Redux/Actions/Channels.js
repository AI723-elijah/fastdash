import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const getChannels = () => {
  let options = { url: 'channels/' };
  options.types = [
    types.CHANNELS_GET_SUCCESS,
    types.CHANNELS_GET_FAILURE
  ]

  return api.get(options);
};
