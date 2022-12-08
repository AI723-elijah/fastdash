import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Table } from 'antd';

const List = ({ salesrep, loading, handleModal }) => {
  const columns = [{
    title: 'Address',
    dataIndex: 'address'
  }, {
    title: 'City',
    dataIndex: 'city'
  }, {
    title: 'State',
    dataIndex: 'state'
  }, {
    title: 'Zip Code',
    dataIndex: 'zipCode'
  }, {
    title: 'State Code',
    dataIndex: 'stateCode'
  }, {
    title: 'Email',
    dataIndex: 'email'
  }, {
    title: 'Company Name',
    dataIndex: 'companyName'
  }, {
    title: 'Rep Name',
    dataIndex: 'repName'
  }, {
    title: 'Phone',
    dataIndex: 'phone'
  }, {
    title: 'Territory',
    dataIndex: 'territory'
  }, {
    title: 'Action',
    dataIndex: 'action',
    render: (text, record) => {
      return (
        <EditOutlined
          className='primary-icon-round'
          key='edit'
          onClick={() => handleModal(record)} />
      );
    }
  }]

  return (
    <Table className='my-10' columns={columns} dataSource={salesrep} loading={loading} />
  );
}

export { List }
