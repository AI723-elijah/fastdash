import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { OnlineRetailers } from '../../Pages/OnlineRetailers';
import { getOnlineRetailers, saveStoreLocators, updateStoreLocators, editRep, deleteStoreLocators } from '../Actions/StoreLocator';
import { startLoading, stopLoading } from '../Actions/Loading';

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    onlineStores: state.storeLocatorsReducer.onlineStores
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOnlineRetailers: bindActionCreators(getOnlineRetailers, dispatch),
    editRep: bindActionCreators(editRep, dispatch),
    deleteStoreLocators: bindActionCreators(deleteStoreLocators, dispatch),
    saveStoreLocators: bindActionCreators(saveStoreLocators, dispatch),
    updateStoreLocators: bindActionCreators(updateStoreLocators, dispatch),
    startLoading: bindActionCreators(startLoading, dispatch),
    stopLoading: bindActionCreators(stopLoading, dispatch)
  }
}

const OnlineRetailersContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(OnlineRetailers));
export { OnlineRetailersContainer };
