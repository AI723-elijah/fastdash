import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table } from 'antd';

import './Styles/List.scss';

let List = ({ storeLocators, loading, deleteStore, handleModal, handleDelete }) => {
    const columns = [{
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 0;
        }
    }, {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'City',
        dataIndex: 'city',
    }, {
        title: 'State',
        dataIndex: 'state',
    },
    {
        title: 'Zip',
        dataIndex: 'zip',
    }, 
    {
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
        dataIndex: 'storeLocatorID',
        render: (text, record) => {
          return (
              <DeleteOutlined
                  className='primary-icon-round'
                  key='delete'
                  onClick={() => handleDelete(record)} />
          );
        }
      }
    ];

    return (
      <Table className='my-10 icons-list' columns={columns} dataSource={storeLocators} loading={loading} deleteStore={deleteStore}/>
    );
}
export { List };
