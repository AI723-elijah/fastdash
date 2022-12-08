import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table } from 'antd';

import './Styles/List.scss';
const List = ({ careers, loading, handleModal, handleDelete }) => {
  const columns = [{
    title: 'Career Title',
    dataIndex: 'title',
    sorter: (a, b) => {
      if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
      if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
      return 0;
    }
  }, {
    title: 'Career Location',
    dataIndex: 'location',
    sorter: (a, b) => {
      if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
      if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
      return 0;
    }
  },
  {
    title: 'Career Description',
    dataIndex: 'description',
  }, {
    title: 'Update',
    dataIndex: 'actions',
    render: (text, record) => {
      return (
        <EditOutlined
          className='primary-icon-round'
          key='edit'
          onClick={() => handleModal(record)} />
      );
    }
  }, {
    title: 'Delete',
    dataIndex: 'careerID',
    render: (text, record) => {
      return (
        <DeleteOutlined
          className='primary-icon-round'
          key='delete'
          onClick={() => handleDelete(record)} />
      );
    }
  }];
  return (
    <Table className='my-10 icons-list' columns={columns} dataSource={careers} loading={loading} />
  );
}

export { List }
