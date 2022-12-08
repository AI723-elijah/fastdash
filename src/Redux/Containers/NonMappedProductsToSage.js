import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { NonMappedProductsToSage } from "../../Pages/NonMappedProductsToSage";
import { getInventoryItems } from "../Actions/Portal";
import { getAllProductsInSystem } from "../Actions/options";
import { startLoading, stopLoading } from "../Actions/Loading";

const mapStateToProps = (state) => {
  return {
    inventoryItems: state.portalReducer.inventoryItems,
    allSkus: state.productReducer.allSkus,
    loading: state.loadingReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInventoryItems: bindActionCreators(getInventoryItems, dispatch),
    getAllProductsInSystem: bindActionCreators(
      getAllProductsInSystem,
      dispatch
    ),
    startLoading: bindActionCreators(startLoading, dispatch),
    stopLoading: bindActionCreators(stopLoading, dispatch),
  };
};

const NonMappedProductsToSageContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NonMappedProductsToSage)
);
export { NonMappedProductsToSageContainer };
