import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Sales } from '../../Pages/Sales';
import { editRep, getSalesReps, saveSalesReps, updateSalesReps, bulkUpload } from '../Actions/Sales';
import { getUsersList, updateUser, sendVerifiedUserEmail, sendRepApprovedEmail } from '../Actions/Users';

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    salesReps: state.salesReducer.salesReps,
    rep: state.salesReducer.rep,
    portalUsers: state.usersReducer.portalUsers,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    editRep: bindActionCreators(editRep, dispatch),
    getSalesReps: bindActionCreators(getSalesReps, dispatch),
    saveSalesReps: bindActionCreators(saveSalesReps, dispatch),
    updateSalesReps: bindActionCreators(updateSalesReps, dispatch),
    bulkUpload: bindActionCreators(bulkUpload, dispatch),
    getUsersList: bindActionCreators(getUsersList, dispatch),
    updateUser: bindActionCreators(updateUser, dispatch),
    sendVerifiedUserEmail: bindActionCreators(sendVerifiedUserEmail, dispatch),
    sendRepApprovedEmail: bindActionCreators(sendRepApprovedEmail, dispatch)
  };
}

const SalesContainer =  withRouter(connect(mapStateToProps, mapDispatchToProps)(Sales));
export { SalesContainer };
