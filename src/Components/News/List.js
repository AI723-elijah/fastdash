import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { newsURL } from '../../Common/createNewsURL';

import './Styles/List.scss';
const List = ({ news, loading, handleModal, handleDelete }) => {
  const columns = [{
    title: 'News Title',
    responsive: ["xs", "sm"],
    dataIndex: 'title',
    sorter: (a, b) => {
      if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
      if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
      return 0;
    }
  }, {
    title: 'News Description',
    dataIndex: 'description',
    width: '110',
    responsive: ["md"]
  }, {
    title: 'News Image',
    dataIndex: 'newsImage',
    responsive: ["sm"],
    render: (text, record) => {
      let src = '';
      if (record.newsImage) {
        src = newsURL(record.newsImage)
      }

      return (
        <div className='image-container'>
          <img src={src} alt='News' />
        </div>
      );
    }
  }, {
    title: 'Update',
    dataIndex: 'actions',
    responsive: ["xs", "sm"],
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
    dataIndex: 'newsID',
    responsive: ["xs", "sm"],
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
    <div className='news-table'>
      <Table className='my-10 icons-list' columns={columns} dataSource={news} loading={loading} />
    </div>
  );
}

export { List }
