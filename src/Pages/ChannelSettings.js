import React, { Component } from 'react';
import { Card } from 'antd';
import { SettingsList } from '../Components/ChannelSettings/List';

class ChannelSettings extends Component {
  render() {
    return (
      <Card title='CHANNEL SETTINGS' className='width-100'>
        <SettingsList />
      </Card>
    );
  }
}

export { ChannelSettings };
