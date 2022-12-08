import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Brandstore } from '../../Pages/Brandstore';
import { editItem, viewItems, createItem, updateItem, deleteItem } from '../Actions/BrandStore';
import { startLoading, stopLoading } from '../Actions/Loading';

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    items: state.brandstoreReducer.items,
    item: state.brandstoreReducer.item
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editItem: bindActionCreators(editItem, dispatch),
    viewItems: bindActionCreators(viewItems, dispatch),
    createItem: bindActionCreators(createItem, dispatch),
    updateItem: bindActionCreators(updateItem, dispatch),
    deleteItem: bindActionCreators(deleteItem, dispatch),
    startLoading: bindActionCreators(startLoading, dispatch),
    stopLoading: bindActionCreators(stopLoading, dispatch)
  }
}

const BrandstoreContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Brandstore));
export { BrandstoreContainer };
