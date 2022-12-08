import { publish } from '../../Services/publish';
import * as types from '../Constants/Constants';

export const publishProduct = sku => {
  let options = { url: `?type=category&sku=${sku}` };
  options.types = [
    types.PUBLISH_SUCCESS,
    types.PUBLISH_FAILURE
  ];

  return publish.post(options);
};
