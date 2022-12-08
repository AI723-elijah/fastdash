import React, { Component } from 'react';
import { Card } from 'antd';
import { NotificationList } from '../Components/Notifications/List';

class Notifications extends Component {
  render() {
    return (
      <Card title='Notifications' className='width-100 products-list'>
        <NotificationList loading={this.props.loading} notifications={this.props.notifications} />
      </Card>
    );
  }
}

export { Notifications };
