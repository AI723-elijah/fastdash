import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table } from 'antd';

import './Styles/List.scss';

const List = ({ items, loading, handleModal, handleDelete }) => {
  const columns = [{
    title: 'Sort',
    dataIndex: 'sort'
  }, {
    title: 'Name',
    dataIndex: 'name'
  }, {
    title: 'Image',
    dataIndex: 'image',
    render: (text, record) => {
      let src = '';
      if (record.image) {
        src = `https://firebasestorage.googleapis.com/v0/b/westgatedash-d1341.appspot.com/o/brandStore%2F${record.image}?alt=media`
      }

      return (
        <div className='image-container'>
          <img src={src} alt='Brand Store Item' />
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
    dataIndex: 'itemID',
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
    <Table className='my-10 icons-list' columns={columns} dataSource={items} loading={loading} />
  );
}

export { List }
