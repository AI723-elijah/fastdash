import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const getNotifications = () => {
  let options = { url: 'channels/channelRequests' };
  options.types = [
    types.NOTIFICATIONS_GET_SUCCESS,
    types.NOTIFICATIONS_GET_FAILURE
  ]

  return api.get(options, null, true);
};

export const readNotification = id => {
  let options = { url: `channels/channelRequests/${id}` };
  options.types = [
    types.NOTIFICATION_READ_SUCCESS,
    types.NOTIFICATION_READ_FAILURE
  ]

  return api.put(options, null, true);
}
