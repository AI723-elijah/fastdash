import React from 'react';
import { List, Skeleton, Typography } from 'antd';
import { getMessage } from '../../Common/getPublishStatusMessage';

const { Item } = List;
const { Text } = Typography;

const NotificationList = ({ loading, notifications }) => {
  return (
    <List
      bordered
      className='m-15'
      loading={loading}
      itemLayout='horizontal'
      dataSource={notifications}
      renderItem={item => {
        return (
          <Item>
            <Skeleton loading={loading} active>
              <Text>{getMessage(item)}</Text>
            </Skeleton>
          </Item>
        )
      }}
    />
  );
}

export { NotificationList };
