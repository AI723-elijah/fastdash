import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Options } from "../../Pages/options";
import {
  AddOptionDocument,
  bulkProductOptionsUploading,
  deleteOption,
  deleteOptionDocument,
  getAllProductsInSystem,
  getOptions,
  getProductsByOption,
  ResetSelectedOptionProducts,
  saveOption,
  updateOption,
} from "../Actions/options";
import { startLoading, stopLoading } from "../Actions/Loading";

const mapStateToProps = (state) => {
  return {
    loading: state.loadingReducer.loading,
    options: state.optionsReducer.options,
    parentProducts: state.optionsReducer.parentProducts,
    childProducts: state.optionsReducer.childProducts,
    optionProducts: state.optionsReducer.optionProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOptions: bindActionCreators(getOptions, dispatch),
    startLoading: bindActionCreators(startLoading, dispatch),
    stopLoading: bindActionCreators(stopLoading, dispatch),
    saveOption: bindActionCreators(saveOption, dispatch),
    deleteOption: bindActionCreators(deleteOption, dispatch),
    updateOption: bindActionCreators(updateOption, dispatch),
    getAllProductsInSystem: bindActionCreators(
      getAllProductsInSystem,
      dispatch
    ),
    getProductsByOption: bindActionCreators(getProductsByOption, dispatch),
    ResetSelectedOptionProducts: bindActionCreators(
      ResetSelectedOptionProducts,
      dispatch
    ),
    bulkProductOptionsUploading: bindActionCreators(
      bulkProductOptionsUploading,
      dispatch
    ),
    deleteOptionDocument: bindActionCreators(deleteOptionDocument, dispatch),
    AddOptionDocument: bindActionCreators(AddOptionDocument, dispatch),
  };
};

const OptionsContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Options)
);
export { OptionsContainer };
