import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Icons } from '../../Pages/Icons';
import { getIcons, saveIcon, updateIcon, deleteIcon,updateIconSort } from '../Actions/Icons';
import { startLoading, stopLoading  } from '../Actions/Loading';

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    icons: state.iconsReducer.icons
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getIcons: bindActionCreators(getIcons, dispatch),
    saveIcon: bindActionCreators(saveIcon, dispatch),
    updateIcon: bindActionCreators(updateIcon, dispatch),
    deleteIcon: bindActionCreators(deleteIcon, dispatch),
    startLoading: bindActionCreators(startLoading, dispatch),
    stopLoading: bindActionCreators(stopLoading, dispatch),
    updateIconSort:bindActionCreators(updateIconSort,dispatch)
  }
}

const IconsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Icons));
export { IconsContainer };
