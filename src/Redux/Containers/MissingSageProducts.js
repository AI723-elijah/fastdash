import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { MissingSageProducts } from '../../Pages/MissingSageProducts';
import { getMissingSageProducts } from '../Actions/Products';
import { startLoading, stopLoading } from './../Actions/Loading';

const mapStateToProps = state => {
    return {
        missingSageProducts: state.productReducer.missingSageProducts,
        loading: state.loadingReducer.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMissingSageProducts: bindActionCreators(getMissingSageProducts, dispatch),
        startLoading: bindActionCreators(startLoading, dispatch),
        stopLoading: bindActionCreators(stopLoading, dispatch)
    }
}

const MissingSageProductsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(MissingSageProducts));
export { MissingSageProductsContainer };
