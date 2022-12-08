import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { ProductForm } from "../../Pages/ProductForm";
import { getAttributes, getDropDownValues } from "../Actions/Attributes";
import { getCategories } from "../Actions/Categories";
import { getSuppliers } from "../Actions/Suppliers";
import { getChannels } from "../Actions/Channels";
import { getIcons, removeVariationIcon } from "../Actions/Icons";
import { getOptions } from "../Actions/options";
import {
  getProduct,
  duplicateProduct,
  saveProduct,
  updateProduct,
  createProductPayload,
  amazonLookUp,
  removeProductVariationImage,
  removeProductVariationVideo,
  removeParentProductImage,
  removeParentProductVideo,
  removeParentOption,
  removeQuestion,
  deleteProductAttribute,
  updateElasticSearchIndex,
} from "../Actions/ProductForm";
import { removeAssociatedProduct, publish } from "../Actions/Products";
import { searchVariations } from "../Actions/Variations";
import { deleteAccessory } from "../Actions/accessories";

import { publishProduct } from "../Actions/Westgate";
import { startLoading, stopLoading } from "../Actions/Loading";

const mapStateToProps = (state) => {
  return {
    loading: state.loadingReducer.loading,
    selectLoading: state.loadingReducer.selectLoading,
    product: state.productReducer.product,
    productDetails: state.productReducer.productDetails,
    realProductDetails: state.productReducer.realProductDetails,
    productRequestPayload: state.productReducer.productRequestPayload,
    attributes: state.attributeReducer.attributes,
    dropdown: state.attributeReducer.dropdown,
    categories: state.categoryReducer.categories,
    suppliers: state.supplierReducer.suppliers,
    channels: state.channelReducer.channels,
    icons: state.iconsReducer.icons,
    options: state.optionsReducer.options,
    productAccessories: state.accessoriesReducer.productAccessories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAttributes: bindActionCreators(getAttributes, dispatch),
    getDropDownValues: bindActionCreators(getDropDownValues, dispatch),
    getCategories: bindActionCreators(getCategories, dispatch),
    getSuppliers: bindActionCreators(getSuppliers, dispatch),
    getChannels: bindActionCreators(getChannels, dispatch),
    getIcons: bindActionCreators(getIcons, dispatch),
    getOptions: bindActionCreators(getOptions, dispatch),
    getProduct: bindActionCreators(getProduct, dispatch),
    duplicateProduct: bindActionCreators(duplicateProduct, dispatch),
    saveProduct: bindActionCreators(saveProduct, dispatch),
    updateProduct: bindActionCreators(updateProduct, dispatch),
    createProductPayload: bindActionCreators(createProductPayload, dispatch),
    amazonLookUp: bindActionCreators(amazonLookUp, dispatch),
    publishProduct: bindActionCreators(publishProduct, dispatch),
    startLoading: bindActionCreators(startLoading, dispatch),
    stopLoading: bindActionCreators(stopLoading, dispatch),
    removeProductVariationImage: bindActionCreators(
      removeProductVariationImage,
      dispatch
    ),
    removeProductVariationVideo: bindActionCreators(
      removeProductVariationVideo,
      dispatch
    ),
    removeParentProductImage: bindActionCreators(
      removeParentProductImage,
      dispatch
    ),
    removeParentProductVideo: bindActionCreators(
      removeParentProductVideo,
      dispatch
    ),
    removeQuestion: bindActionCreators(removeQuestion, dispatch),
    removeParentOption: bindActionCreators(removeParentOption, dispatch),
    removeVariationIcon: bindActionCreators(removeVariationIcon, dispatch),
    removeAssociatedProduct: bindActionCreators(
      removeAssociatedProduct,
      dispatch
    ),
    publish: bindActionCreators(publish, dispatch),
    searchVariations: bindActionCreators(searchVariations, dispatch),
    deleteAccessory: bindActionCreators(deleteAccessory, dispatch),
    deleteProductAttribute: bindActionCreators(
      deleteProductAttribute,
      dispatch
    ),
    updateElasticSearchIndex: bindActionCreators(
      updateElasticSearchIndex,
      dispatch
    ),
  };
};

const ProductFormContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductForm)
);
export { ProductFormContainer };
