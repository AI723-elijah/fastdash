import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const getSiteMap = () => {
  let options = { url: `sitemap` };
  options.types = [
    types.GET_SITE_MAP_SUCCESS,
    types.GET_SITE_MAP_FAILURE
  ]

  return api.get(options);
}

export const saveSiteMap = (params) => {
    let options = { url: `sitemap` };
    options.types = [
      types.GET_SITE_MAP_SUCCESS,
      types.GET_SITE_MAP_FAILURE
    ]
  
    return api.post(options, params);
  }