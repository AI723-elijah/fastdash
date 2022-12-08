import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Careers } from '../../Pages/Careers';
import { getCareers, saveCareer, editRep, updateCareer, deleteCareer } from '../Actions/Careers';
import { startLoading, stopLoading } from '../Actions/Loading';

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    careers: state.careersReducer.careers,
    rep: state.careersReducer.rep
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editRep: bindActionCreators(editRep, dispatch),
    updateCareer: bindActionCreators(updateCareer, dispatch),
    deleteCareer: bindActionCreators(deleteCareer, dispatch),
    getCareers: bindActionCreators(getCareers, dispatch),
    saveCareer: bindActionCreators(saveCareer, dispatch),
    startLoading: bindActionCreators(startLoading, dispatch),
    stopLoading: bindActionCreators(stopLoading, dispatch)
  }
}

const CareersContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Careers));
export { CareersContainer };
