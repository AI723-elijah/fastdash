import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Login } from '../../Pages/Login';
import { login } from '../Actions/Login';

const mapStateToProps = state => {
  return {
    email: state.authReducer.email,
    loading: state.loadingReducer.loading,
    error: state.authReducer.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: bindActionCreators(login, dispatch)
  }
}

const LoginContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
export { LoginContainer };
