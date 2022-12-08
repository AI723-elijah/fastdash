import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Services } from '../../Pages/Services';
import { editService, getServices, createService, updateService, deleteService } from '../Actions/Services';
import { startLoading, stopLoading } from '../Actions/Loading';

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    services: state.servicesReducer.services,
    service: state.servicesReducer.service
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editService: bindActionCreators(editService, dispatch),
    getServices: bindActionCreators(getServices, dispatch),
    createService: bindActionCreators(createService, dispatch),
    updateService: bindActionCreators(updateService, dispatch),
    deleteService: bindActionCreators(deleteService, dispatch),
    startLoading: bindActionCreators(startLoading, dispatch),
    stopLoading: bindActionCreators(stopLoading, dispatch)
  }
}

const ServicesContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Services));
export { ServicesContainer };
