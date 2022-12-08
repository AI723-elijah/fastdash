
import React from 'react';
import { List } from 'antd';

const UnsyncedAttributesList = (data) => {
  return (
    data.unSyncedAttributes.length > 0 &&
    <List
      size="small"
      header={<div>Following attributes were marked to sync and not found on Magento. Press continue to sync!</div>}
      bordered
      dataSource={data.unSyncedAttributes}
      renderItem={item => <List.Item>{item.attribute_code}</List.Item>}
    />
  )
}

const createdAttributesList = (data) => {
  return (
    data.createdAttributes.length > 0 &&
    <List
      size="small"
      header={<div>Following attributes were created in Magento on your request.</div>}
      bordered
      dataSource={data.createdAttributes}
      renderItem={item => <List.Item>{item.attribute_code}</List.Item>}
    />
  )
}

export default { UnsyncedAttributesList, createdAttributesList };