import React, { Component } from 'react';
import { Layout, notification } from 'antd';
import { Sidebar } from './Siderbar';
import { ContentArea } from './ContentArea';
import { getMessage } from '../Common/getPublishStatusMessage';
import './index.scss';

class DashboardLayout extends Component {
  componentDidMount() {
    if(process.env.REACT_APP_NAME === 'fas') {
      const { getNotifications } = this.props;
  
      getNotifications().then(res => this.displayNotification(res));
      setInterval(() => {
        getNotifications().then(res => this.displayNotification(res));
      }, 60000)
    }
  }

  navigate = () => {
    const { history } = this.props;

    history.push('/notifications');
  }

  displayNotification = res => {
    const { readNotification } = this.props;
    res.payload.map(e => {
      if(!e.seen) {
        readNotification(e.channelRequestID);
        const type = e.status === 'pending' ? 'warning' : e.status === 'completed' ? 'success' : 'error';
        const message = getMessage(e);
        notification[type]({
          message: e.status.toUpperCase(),
          description: message,
          onClick: this.navigate
        });
      }
      return notification
    })
  }

  render() {
    return (
      <Layout className='im-dashboard-layout'>
        <Sidebar {...this.props} />
        <ContentArea {...this.props} />
      </Layout>
    );
  }
}

export { DashboardLayout };
