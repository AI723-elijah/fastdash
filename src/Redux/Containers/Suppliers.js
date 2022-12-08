import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Suppliers } from '../../Pages/Suppliers';
import { searchSuppliers, getSuppliers, saveSupplier } from '../Actions/Suppliers';

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    suppliers: state.supplierReducer.suppliers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchSuppliers: bindActionCreators(searchSuppliers, dispatch),
    getSuppliers: bindActionCreators(getSuppliers, dispatch),
    saveSupplier: bindActionCreators(saveSupplier, dispatch)
  }
}

const SuppliersContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Suppliers));
export { SuppliersContainer };
