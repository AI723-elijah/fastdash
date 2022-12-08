import { api } from "../../Services/api";
import * as types from "../Constants/Constants";

export const emptyProducts = () => (dispatch) => {
  return dispatch({
    type: "EMPTY_PRODUCT",
    payload: [],
  });
};

export const saveSearchCriteria = (str) => (dispatch) => {
  return dispatch({
    type: types.SAVE_QUERY,
    payload: str,
  });
};

export const getProducts = (skip, type = "Parent") => {
  let options = { url: `products?skip=${skip}&type=${type}` };
  options.types = [types.PRODUCTS_GET_SUCCESS, types.PRODUCTS_GET_FAILURE];

  return api.get(options);
};

export const getVariations = (skip) => {
  let options = { url: `products/variations?skip=${skip}` };
  options.types = [types.VARIATIONS_GET_SUCCESS, types.VARIATIONS_GET_FAILURE];

  return api.get(options);
};

export const getProductsVariations = (product_ids, skip = 0) => {
  let options = { url: `products/products-variations` };
  options.types = [
    types.PRODUCTS_VARIATIONS_GET_SUCCESS,
    types.PRODUCTS_VARIATIONS_GET_FAILURE,
  ];

  return api.post(options, { product_ids, skip });
};

export const removeProductsVariation = (product_id) => {
  let options = { url: `/products/variations/${product_id}` };
  options.types = [
    types.PRODUCTS_VARIATIONS_DELETE_SUCCESS,
    types.PRODUCTS_VARIATIONS_DELETE_FAILURE,
  ];
  return api.delete(options, { product_id });
};

export const getMasterProducts = (skip) => {
  let options = { url: `products/master-products?skip=${skip}` };
  options.types = [types.PRODUCTS_GET_SUCCESS, types.PRODUCTS_GET_FAILURE];

  return api.get(options);
};

export const searchProducts = (str) => {
  let options = { url: `products/search-product?str=${str}` };
  options.types = [
    types.PRODUCTS_SEARCH_SUCCESS,
    types.PRODUCTS_SEARCH_FAILURE,
  ];

  return api.get(options);
};

export const publish = (params) => {
  let options = { url: "operations" };
  options.types = [
    types.PUBLISH_CHANNEL_SUCCESS,
    types.PUBLISH_CHANNEL_FAILURE,
  ];

  return api.post(options, params);
};

export const bulkUpload = (body) => {
  let options = { url: `products/bulk-create` };
  options.types = [types.PRODUCT_BULK_SUCCESS, types.PRODUCT_BULK_FAILURE];

  return api.post(options, body);
};

export const applyFilter = ({ category, channel, price, status }) => {
  let options = {
    url: `products/filter-products?status=${status}&price=${price}&channel=${channel}&category=${category}`,
  };
  options.types = [
    types.FILTER_PRODUCTS_SUCCESS,
    types.FILTER_PRODUCTS_FAILURE,
  ];

  return api.get(options);
};

export const refreshTierPricing = () => {
  let options = { url: "products/refresh-tier-pricing" };
  options.types = [
    types.REFRESH_TIERPRICES_SUCCESS,
    types.REFRESH_TIERPRICES_FAILURE,
  ];

  return api.post(options);
};

export const getByCategory = (id) => {
  let options = { url: `products/get-by-category?category=${id}` };
  options.types = [
    types.GET_BY_CATEGORY_SUCCESS,
    types.GET_BY_CATEGORY_FAILURE,
  ];

  return api.get(options);
};

export const quickSearch = (str) => {
  let options = { url: `products/quick-search?str=${str}` };
  options.types = [types.QUICK_SEARCH_SUCCESS, types.QUICK_SEARCH_FAILURE];

  return api.get(options);
};

export const associateToProduct = (params) => {
  let options = { url: "products/product-categories/" };
  options.types = [
    types.ASSOCIATE_TO_PRODUCT_SUCCESS,
    types.ASSOCIATE_TO_PRODUCT_FAILURE,
  ];

  return api.post(options, params);
};

// Remove Associated Product from category
export const removeAssociatedProduct = (ids) => {
  console.log(ids, { ids: [ids] });
  let options = { url: `products/product-categories/` };
  options.types = [
    types.REMOVE_ASSOCIATED_PRODUCT_SUCCESS,
    types.REMOVE_ASSOCIATED_PRODUCT_FAILURE,
  ];
  return api.delete(options, { ids: ids });
};

export const updateProductImagesSort = (images) => {
  let options = { url: "product-images/update-sort" };
  options.types = [
    types.PRODUCT_IMAGES_SORT_ORDER_UPDATE_SUCCESS,
    types.PRODUCT_IMAGES_SORT_ORDER_UPDATE_FAILURE,
  ];

  return api.post(options, {
    images: [...images],
  });
};

export const getProductsUrlKeys = (search) => {
  let options = { url: `products/getUrlKeys/${search}` };
  options.types = [
    types.PRODUCTS_URL_KEYS_SUCCESS,
    types.PRODUCTS_URL_KEYS_FAILURE,
  ];

  return api.get(options);
};

export const setUserCanEnterUrlKey = (value) => (dispatch) => {
  return dispatch({
    type: types.SET_USER_CAN_ENTER_URL_KEY,
    payload: value,
  });
};

export const updateVariationsPriceInBulk = (params) => {
  let options = { url: "products/bulk-price-update" };
  options.types = [
    "UPDATE_VARIATIONS_PRICE_IN_BULK_SUCCESS",
    "UPDATE_VARIATIONS_PRICE_IN_BULK_FAILURE",
  ];

  return api.post(options, params);
};

export const downloadOrders = (params) => {
  let options = { url: "channels/amazon/listOrders" };
  options.types = ["DOWNLOAD_ORDERS_SUCCESS", "DOWNLOAD_ORDERS_FAILURE"];

  return api.post(options, params);
};

export const updateProductSort = (params) => {
  let options = { url: `products/updateSort` };
  options.types = [
    types.UPDATE_PRODUCT_SORT_SUCCESS,
    types.UPDATE_PRODUCT_SORT_FAILURE,
  ];

  return api.put(options, params);
};

export const BulkUploadElasticSearch = (page) => {
  let options = { url: `elastic-search?page=${page}` };
  options.types = ["BULK_UPLOAD_SUCCESS", "BULK_UPLOAD_FAILURE"];

  return api.get(options);
};

export const deleteIndex = () => {
  let options = { url: "elastic-search/delete-index" };
  options.types = ["DELETE_INDEX_SUCCESS", "DELETE_INDEX_FAILURE"];

  return api.post(options);
};

export const createMapping = () => {
  let options = { url: "elastic-search/mapping" };
  options.types = ["CREATE_MAPPING_SUCCESS", "CREATE_MAPPING_FAILURE"];

  return api.get(options);
};

export const updateProductVideosSort = (videos) => {
  let options = { url: "product-videos/update-sort" };
  options.types = [
    types.PRODUCT_VIDEOS_SORT_ORDER_UPDATE_SUCCESS,
    types.PRODUCT_VIDEOS_SORT_ORDER_UPDATE_FAILURE,
  ];

  return api.post(options, {
    videos: [...videos],
  });
};

export const getMissingSageProducts = () => {
  let options = { url: "products/get/missing" };
  options.types = [
    types.GET_MISSING_SAGE_PRODUCTS_SUCCESS,
    types.GET_MISSING_SAGE_PRODUCTS_FALIURE,
  ];

  return api.get(options);
};
