import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { slideInURL } from '../../Common/createSlideInURL';

import './Styles/List.scss';
const List = ({ slideIns, loading, handleModal, handleDelete }) => {
    const columns = [{
        title: 'Title',
        dataIndex: 'title',
        sorter: (a, b) => {
            if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
            return 0;
        }
    }, {
        title: 'Description',
        dataIndex: 'description',
        sorter: (a, b) => {
            if (a.description.toLowerCase() > b.description.toLowerCase()) return 1;
            if (a.description.toLowerCase() < b.description.toLowerCase()) return -1;
            return 0;
        }
    }, {
        title: 'Image',
        dataIndex: 'imageUrl',
        render: (text, record) => {
            let src = '';
            if (record.imageURL) {
                src = slideInURL(record.imageURL)
            }

            return (
                <div className='image-container'>
                    <img src={src} alt='slideIn' />
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
        dataIndex: 'ID',
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
        <Table className='my-10 icons-list' columns={columns} dataSource={slideIns} loading={loading} />
    );
}

export { List }
