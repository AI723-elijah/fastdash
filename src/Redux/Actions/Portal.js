import { portalApi } from '../../Services/portalApi';
import * as types from '../Constants/Constants';

export const getInventoryItems = () => {
  let options = { url: 'inventory-items/syncInventoryItems' };
  options.types = [
    types.INVENTORY_ITEMS_SUCCESS,
    types.INVENTORY_ITEMS_FAILURE
  ]

  return portalApi.get(options);
};

export const getSageItem = (ItemCode) => {
  let options = { url: `inventory-items/getInventoryItems?ItemCode=${ItemCode}` };
  options.types = [
    types.GET_INVENTORY_ITEM_SUCCESS,
    types.GET_INVENTORY_ITEM_FAILURE
  ]

  return portalApi.get(options);
};