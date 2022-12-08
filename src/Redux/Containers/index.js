import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { App } from '../../Pages';
import { getNotifications, readNotification } from '../Actions/Notifications';
import { removeProductsVariation } from '../Actions/Products';
import { logout } from '../Actions/Login';

const mapDispatchToProps = dispatch => {
  return {
    getNotifications: bindActionCreators(getNotifications, dispatch),
    readNotification: bindActionCreators(readNotification, dispatch),
    removeProductsVariation: bindActionCreators(removeProductsVariation, dispatch),
    logout: bindActionCreators(logout, dispatch)
  }
}

const AppContainer = withRouter(connect(null, mapDispatchToProps)(App));
export { AppContainer };
