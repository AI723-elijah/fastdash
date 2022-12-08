import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Users } from '../../Pages/Users';
import { startLoading, stopLoading } from '../Actions/Loading';
import { getUsersList, createNewUser, updateUser, getUserDetails, editRep, resetUserPassword, sendVerifiedUserEmail, sendRepDeclinedEmail } from '../Actions/Users';

const mapStateToProps = state => {
    return {
        loading: state.loadingReducer.loading,
        dashboardUsers: state.usersReducer.dashboardUsers,
        portalUsers: state.usersReducer.portalUsers,
        user: state.usersReducer.user,
        rep: state.usersReducer.rep
    }
}

const mapDispatchToProps = dispatch => {
    return {
        startLoading: bindActionCreators(startLoading, dispatch),
        stopLoading: bindActionCreators(stopLoading, dispatch),
        editRep: bindActionCreators(editRep, dispatch),
        getUsersList: bindActionCreators(getUsersList, dispatch),
        createNewUser: bindActionCreators(createNewUser, dispatch),
        updateUser: bindActionCreators(updateUser, dispatch),
        getUserDetails: bindActionCreators(getUserDetails, dispatch),
        resetUserPassword: bindActionCreators(resetUserPassword, dispatch),
        sendVerifiedUserEmail: bindActionCreators(sendVerifiedUserEmail, dispatch),
        sendRepDeclinedEmail: bindActionCreators(sendRepDeclinedEmail, dispatch)
    }
}

const UserContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));
export { UserContainer };
