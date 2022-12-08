import * as types from "../Constants/Constants";
import { api } from "../../Services/api";
import { cloudAPI } from "../../Services/cloudFunctions";

export const getProduct = (id) => {
  let options = { url: `products/${id}` };
  options.types = [types.PRODUCT_GET_SUCCESS, types.PRODUCT_GET_FAILURE];

  return api.get(options);
};

export const duplicateProduct = (id) => {
  let options = { url: `products/master-product/duplicate/${id}` };
  options.types = [
    types.PRODUCTS_DUPLICATE_SUCCESS,
    types.PRODUCTS_DUPLICATE_FAILURE,
  ];

  return api.get(options);
};

export const saveProduct = (params) => {
  let options = { url: `products` };
  options.types = [types.PRODUCT_SAVE_SUCCESS, types.PRODUCT_SAVE_FAILURE];

  return api.post(options, params);
};

export const updateProduct = (params) => {
  let options = { url: `products/${params.productID}` };
  options.types = [types.PRODUCT_UPDATE_SUCCESS, types.PRODUCT_UPDATE_FAILURE];

  return api.put(options, params);
};

export const createProductPayload = (params) => (dispatch) => {
  dispatch({
    type: types.PRODUCT_PAYLOAD,
    payload: { params: params },
  });
};

export const amazonLookUp = (params) => {
  let options = { url: `getMatchingProductForId` };
  options.types = [types.AMAZON_LOOKUP_SUCCESS, types.AMAZON_LOOKUP_FAILURE];

  return cloudAPI.post(options, params);
};

export const removeParentProductImage = (productImageID) => {
  let options = { url: `/product-images/${productImageID}` };
  options.types = [
    types.DELETE_PARENT_PRODUCT_IMAGE_SUCCESS,
    types.DELETE_PARENT_PRODUCT_IMAGE_FAILURE,
  ];
  return api.delete(options);
};

export const removeProductVariationImage = (imageId) => {
  let options = { url: `products/variations-image/${imageId}` };
  options.types = [
    types.PRODUCTS_VARIATIONS_IMAGE_DELETE_SUCCESS,
    types.PRODUCTS_VARIATIONS_IMAGE_DELETE_FAILURE,
  ];

  return api.delete(options);
};

export const removeProductVariationVideo = (videoId) => {
  let options = { url: `products/variations-video/${videoId}` };
  options.types = [
    types.PRODUCTS_VARIATIONS_VIDEO_DELETE_SUCCESS,
    types.PRODUCTS_VARIATIONS_VIDEO_DELETE_FAILURE,
  ];

  return api.delete(options);
};

export const removeParentProductVideo = (productVideoID) => {
  let options = { url: `/product-videos/${productVideoID}` };
  options.types = [
    types.DELETE_PARENT_PRODUCT_VIDEO_SUCCESS,
    types.DELETE_PARENT_PRODUCT_VIDEO_FAILURE,
  ];
  return api.delete(options);
};

export const removeQuestion = ({ productID, productQAsID }) => {
  let options = { url: `productQA/${productQAsID}?productID=${productID}` };
  options.types = [
    types.REMOVE_QUESTION_SUCCESS,
    types.REMOVE_QUESTION_FAILURE,
  ];
  return api.delete(options);
};

export const removeParentOption = (id) => {
  let options = { url: `productOptions/delete/${id}` };
  options.types = [
    types.DELETE_PARENT_OPTION_SUCCESS,
    types.DELETE_PARENT_OPTION_FAILURE,
  ];
  return api.delete(options);
};

export const deleteProductAttribute = (id) => {
  let options = { url: `productAttributes/${id}` };
  options.types = [
    "DELETE_PRODUCT_ATTRIBUTE_SUCCESS",
    "DELETE_PRODUCT_ATTRIBUTE_FAILURE",
  ];

  return api.delete(options);
};

export const updateElasticSearchIndex = (id) => {
  let options = { url: `elastic-search?productID=${id}` };
  options.types = ["UPDATE_INDEX_SUCCESS", "UPDATE_INDEX_FAILURE"];

  return api.post(options);
};
