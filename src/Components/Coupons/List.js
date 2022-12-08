import React from 'react';
import { Table, Button, Popconfirm } from 'antd';

const List = ({ couponsList, loading, handleModal, handleDelete }) => {
    const couponColumns = [{
        title: 'Coupon',
        dataIndex: 'coupon'
        }, {
        title: 'Discount (%)',
        dataIndex: 'discount'
        }, {
        title: 'Start Date-Time',
        dataIndex: 'startDateTime'
        }, {
        title: 'End Date-Time',
        dataIndex: 'endDateTime'
      }, {
       title: 'Websites',
      dataIndex: 'websites',
      render: (text, record) => {
        return (
          <ul>
            {record.websites && record.websites.map((web, index) => 
              <li key={index}>{web.name}</li>
            )}
          </ul>
        )
      }
        }, {
        title: 'Action',
        dataIndex: 'action',
        render: (text, record) => {
            return (
              <>
                <Button type="primary" onClick={() => handleModal(record, 'Edit Coupon')} style={{ marginRight: '5px' }} >Edit</Button>
                <Popconfirm
                  title="Are you sure delete this Coupon?"
                  onConfirm={() => handleDelete(record)}
                  okText="Yes"
                  cancelText="No">
                  <Button type="danger">Delete</Button>
                </Popconfirm>
                </>
                );
            }
        }]

  return (
      <Table 
        className='my-10' 
        columns={couponColumns} 
        dataSource={couponsList} 
        loading={loading} 
      />
  );
}

export { List }
