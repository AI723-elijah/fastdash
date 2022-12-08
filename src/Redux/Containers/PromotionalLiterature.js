import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Literature } from '../../Pages/PromotionalLiterature';
import { getLiteratures, saveLiteratures, updateLiteratures, deleteLiteratures, editRep, updateLiteraturesSort } from '../Actions/PromotionalLiterature';
import { startLoading, stopLoading } from '../Actions/Loading';

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    literatures: state.literaturesReducer.literatures,
    rep: state.salesReducer.rep
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getLiteratures: bindActionCreators(getLiteratures, dispatch),
    editRep: bindActionCreators(editRep, dispatch),
    updateLiteratures: bindActionCreators(updateLiteratures, dispatch),
    deleteLiteratures: bindActionCreators(deleteLiteratures, dispatch),
    saveLiteratures: bindActionCreators(saveLiteratures, dispatch),
    startLoading: bindActionCreators(startLoading, dispatch),
    stopLoading: bindActionCreators(stopLoading, dispatch),
    updateLiteraturesSort:bindActionCreators(updateLiteraturesSort, dispatch),
  }
}

const LiteratureContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Literature));
export { LiteratureContainer };
