import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Brand } from '../../Pages/Brands';
import { getBrands, saveBrands, editRep, updateBrand, deleteBrand } from '../Actions/Brands';
import { startLoading, stopLoading } from '../Actions/Loading';

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    brands: state.brandsReducer.brands,
    rep: state.brandsReducer.rep
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editRep: bindActionCreators(editRep, dispatch),
    getBrands: bindActionCreators(getBrands, dispatch),
    updateBrand: bindActionCreators(updateBrand, dispatch),
    saveBrands: bindActionCreators(saveBrands, dispatch),
    deleteBrand: bindActionCreators(deleteBrand, dispatch),
    startLoading: bindActionCreators(startLoading, dispatch),
    stopLoading: bindActionCreators(stopLoading, dispatch)
  }
}

const BrandsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Brand));
export { BrandsContainer };
