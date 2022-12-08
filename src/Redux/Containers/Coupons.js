import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Coupons } from '../../Pages/Coupons';
import { startLoading, stopLoading } from '../Actions/Loading';
import { getCoupons, createCoupon, editRep, updateCoupon, deleteCoupon } from '../Actions/Coupons';
import { getWebsites } from '../Actions/Websites';

const mapStateToProps = state => {
    return {
        loading: state.loadingReducer.loading,
        coupons: state.couponsReducer.coupons,
        rep: state.couponsReducer.rep,
        websites: state.websitesReducer.websites
    }
}

const mapDispatchToProps = dispatch => {
    return {
        startLoading: bindActionCreators(startLoading, dispatch),
        stopLoading: bindActionCreators(stopLoading, dispatch),
        editRep: bindActionCreators(editRep, dispatch),
        getCoupons: bindActionCreators(getCoupons, dispatch),
        createCoupon: bindActionCreators(createCoupon, dispatch),
        updateCoupon: bindActionCreators(updateCoupon, dispatch),
        deleteCoupon: bindActionCreators(deleteCoupon, dispatch),
        getWebsites: bindActionCreators(getWebsites, dispatch)
    }
}

const CouponsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Coupons));
export { CouponsContainer };
