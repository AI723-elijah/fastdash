import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table } from 'antd';

import './Styles/List.scss';

const List = ({ services, loading, handleModal, handleDelete }) => {
  const columns = [{
    title: 'Sort',
    dataIndex: 'sort'
  }, {
    title: 'Title',
    dataIndex: 'title'
  }, {
    title: 'Description',
    dataIndex: 'description',
    width: '60%',
  }, {
    title: 'Image',
    dataIndex: 'image',
    render: (text, record) => {
      let src = '';
      if (record.image) {
        src = `https://firebasestorage.googleapis.com/v0/b/westgatedash-d1341.appspot.com/o/serviceImages%2F${record.image}?alt=media`
      }

      return (
        <div className='image-container'>
          <img src={src} alt='Service' />
        </div>
      );
    }
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
    dataIndex: 'serviceID',
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
    <Table className='my-10 icons-list' columns={columns} dataSource={services} loading={loading} />
  );
}

export { List }
