import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { brandsURL } from '../../Common/createBrandsURL';

import './Styles/List.scss';
const List = ({ brands, loading, handleModal, handleDelete }) => {
const columns = [{
  title: 'Brand',
  dataIndex: 'brandImage',
  render: (text, record) => {
    let src = '';
    if(record.brandImage) {
      src = brandsURL(record.brandImage)
    }

    return (
      <div className='image-container'>
        <img src={src} alt='Brand' />
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
  dataIndex: 'actions',
  render: (text, record) => {
    return (
      <DeleteOutlined
        className='primary-icon-round'
        key='delete'
        onClick={() => handleDelete(record.brandID)} />
    );
  }
}];


  return (
    <Table className='my-10 icons-list' columns={columns} dataSource={brands} loading={loading} />
  );
}

export { List }
