import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { StoreLocator } from '../../Pages/StoreLocator';
import { getStoreLocators, saveStoreLocators, updateStoreLocators, deleteStoreLocators, editRep } from '../Actions/StoreLocator';
import { startLoading, stopLoading } from '../Actions/Loading';

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    storeLocators: state.storeLocatorsReducer.storeLocators,
    rep: state.newsReducer.rep
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getStoreLocators: bindActionCreators(getStoreLocators, dispatch),
    updateStoreLocators: bindActionCreators(updateStoreLocators, dispatch),
    deleteStoreLocators: bindActionCreators(deleteStoreLocators, dispatch),
    saveStoreLocators: bindActionCreators(saveStoreLocators, dispatch),
    editRep: bindActionCreators(editRep, dispatch),
    startLoading: bindActionCreators(startLoading, dispatch),
    stopLoading: bindActionCreators(stopLoading, dispatch)
  }
}

const StoreLocatorsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(StoreLocator));
export { StoreLocatorsContainer };
