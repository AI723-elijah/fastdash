import React from 'react';
import { Table, Button } from 'antd';

import './Styles/List.scss';

const List = ({ contacts, loading, handleEdit }) => {
  const columns = [{
    title: 'Department',
    dataIndex: 'department'
  }, {
    title: 'Email',
    dataIndex: 'email'
  }, {
    title: 'Actions',
    dataIndex: 'actions',
    render: (text, record) => {
      return (
        <Button type="primary" onClick={() => handleEdit(record)} style={{ marginRight: '5px' }} >Edit</Button>
      )
    }
  }];

  return (
    <>
      <Table className='my-10' columns={columns} dataSource={contacts} loading={loading} rowKey='id' />
    </>
  );
}

export { List }
