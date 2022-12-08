import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { ChangePassword } from '../../Pages/ChangePassword';
import { startLoading, stopLoading } from '../Actions/Loading';
import { changePassword } from '../Actions/Login';

const mapStateToProps = state => {
    return {
        loading: state.loadingReducer.loading,
        error: state.authReducer.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        startLoading: bindActionCreators(startLoading, dispatch),
        stopLoading: bindActionCreators(stopLoading, dispatch),
        changePassword: bindActionCreators(changePassword, dispatch)
    }
}

const ChangePasswordContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangePassword));
export { ChangePasswordContainer };
