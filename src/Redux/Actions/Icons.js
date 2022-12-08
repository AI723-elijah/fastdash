import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const getIcons = () => {
  let options = { url: 'icons/' };
  options.types = [
    types.ICONS_GET_SUCCESS,
    types.ICONS_GET_FAILURE
  ]

  return api.get(options);
};

export const saveIcon = params => {
  let options = { url: 'icons/' };
  options.types = [
    types.ICON_SAVE_SUCCESS,
    types.ICON_SAVE_FAILURE
  ]

  return api.post(options, params);
};

export const updateIcon = (id, icon) => {
  let options = { url: `icons/${id}` };
  options.types = [
    types.ICON_UPDATE_SUCCESS,
    types.ICON_UPDATE_FAILURE
  ]

  return api.put(options, icon);
};

export const deleteIcon = (id) => {
  let options = { url: `icons/${id}` };
  options.types = [
    types.ICON_DELETE_SUCCESS,
    types.ICON_DELETE_FAILURE
  ];
  return api.delete(options);
}

export const removeVariationIcon = id => {
  let options = { url: `productIcons/${id}` };
  options.types = [
    types.DELETE_VARIATION_ICON_SUCCESS,
    types.DELETE_VARIATION_ICON_FAILURE
  ]

  return api.delete(options)

}
export const updateIconSort = params => {
  let options = { url: `icons/updateSort` };
  options.types = [
    types.UPDATE_ICON_SORT_SUCCESS,
    types.UPDATE_ICON_SORT_FAILURE
  ]

  return api.put(options, params);
};