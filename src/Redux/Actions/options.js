import { api } from "../../Services/api";
import * as types from "../Constants/Constants";

export const getOptions = () => {
  let options = { url: "options/" };
  options.types = [types.GET_OPTIONS_SUCCESS, types.GET_OPTIONS_FAILURE];
  return api.get(options);
};

export const saveOption = (params) => {
  let options = { url: "options/" };
  options.types = [types.ADD_OPTIONS_SUCCESS, types.ADD_OPTIONS_FAILURE];
  return api.post(options, params);
};

export const deleteOption = (id) => {
  let options = { url: `options?id=${id}` };
  options.types = [types.DELETE_OPTION_SUCCESS, types.DELETE_OPTION_FAILURE];
  return api.delete(options);
};

export const deleteOptionDocument = (id) => {
  let options = { url: `optionDocuments/${id}` };
  options.types = [
    types.REMOVE_OPTION_DOCUMENT_SUCCESS,
    types.REMOVE_OPTION_DOCUMENT_FAILURE,
  ];
  return api.delete(options);
};

export const AddOptionDocument = (params) => {
  let options = { url: "optionDocuments" };
  options.types = [
    types.UPDATE_OPTION_DOCUMENT_SUCCESS,
    types.UPDATE_OPTION_DOCUMENT_FAILURE,
  ];
  return api.post(options, params);
};

export const updateOption = (params) => {
  let options = { url: "options/" };
  options.types = [types.UPDATE_OPTION_SUCCESS, types.UPDATE_OPTION_FAILURE];
  return api.put(options, params);
};
export const getAllProductsInSystem = () => {
  let options = { url: "products/allsystemProducts" };
  options.types = [
    types.GET_ALL_PRODUCTS_IN_SYSTEM_SUCCESS,
    types.GET_ALL_PRODUCTS_IN_SYSTEM_FAILURE,
  ];
  return api.get(options);
};

export const getProductsByOption = (optionID) => {
  let options = { url: `productOptions/options/${optionID}` };
  options.types = [
    types.GET_PRODUCTS_BY_OPTION_SUCCESS,
    types.GET_PRODUCTS_BY_OPTION_FAILURE,
  ];
  return api.get(options);
};

export const bulkProductOptionsUploading = (params) => {
  let options = { url: "productOptions/bulkuploading" };
  options.types = [
    types.BULK_PRODUCT_OPTIONS_UPLOADING_SUCCESS,
    types.BULK_PRODUCT_OPTIONS_UPLOADING_FAILURE,
  ];
  return api.post(options, params);
};

export const ResetSelectedOptionProducts = () => {
  return {
    type: types.RESET_SELECTED_OPTION_PRODUCTS,
  };
};
