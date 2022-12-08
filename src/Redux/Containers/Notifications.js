import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Notifications } from '../../Pages/Notifications';
import { getNotifications } from '../Actions/Notifications';

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    notifications: state.notificationReducer.notifications,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNotifications: bindActionCreators(getNotifications, dispatch)
  }
}

const NotificationsContainer =  withRouter(connect(mapStateToProps, mapDispatchToProps)(Notifications));
export { NotificationsContainer };
