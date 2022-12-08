import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { catalogURL } from '../../Common/createCatalogURL';

import './Styles/List.scss';
const List = ({ catalogs, loading, handleModal, handleDelete }) => {
  const columns = [{
    title: 'Catalog Name',
    dataIndex: 'catalogName',
    sorter: (a, b) => {
      if (a.catalogName.toLowerCase() > b.catalogName.toLowerCase()) return 1;
      if (a.catalogName.toLowerCase() < b.catalogName.toLowerCase()) return -1;
      return 0;
    }
  }, {
    title: 'Catalog',
    dataIndex: 'catalogImage',
    render: (text, record) => {
      let src = '';
      if (record.catalogImage) {
        src = catalogURL(record.catalogImage)
      }

      return (
        <div className='image-container'>
          <img src={src} alt='Catalog' />
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
    dataIndex: 'catalogID',
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
    <Table className='my-10 icons-list' columns={columns} dataSource={catalogs} loading={loading} />
  );
}

export { List }
