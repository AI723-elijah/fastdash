import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Banners } from '../../Pages/Banners';
import { getBanners, saveBanner, deleteBanner, editRep, updateBanner } from '../Actions/Banners';
import { startLoading, stopLoading } from '../Actions/Loading';

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    banners: state.bannerReducer.banners,
    rep: state.bannerReducer.rep
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editRep: bindActionCreators(editRep, dispatch),
    updateBanner: bindActionCreators(updateBanner, dispatch),
    getBanners: bindActionCreators(getBanners, dispatch),
    saveBanner: bindActionCreators(saveBanner, dispatch),
    deleteBanner: bindActionCreators(deleteBanner, dispatch),
    startLoading: bindActionCreators(startLoading, dispatch),
    stopLoading: bindActionCreators(stopLoading, dispatch)
  }
}

const BannersContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Banners));
export { BannersContainer };
