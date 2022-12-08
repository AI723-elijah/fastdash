import React from 'react';
import { Table, Switch, Button, Popconfirm } from 'antd';

const List = ({ user, users, loading, handleStatus, handleModal, handleResetPassword, handleDecline }) => {

  const dashboardUserColumns = [{
    title: 'First Name',
    dataIndex: 'fname'
  }, {
    title: 'Last Name',
    dataIndex: 'lname'
  }, {
    title: 'Email',
    dataIndex: 'email'
  }, {
    title: 'Role',
    dataIndex: 'role'
  }, {
    title: 'Activate',
    dataIndex: 'status',
    render: (text, record) => {
      return (
        <Switch
          defaultChecked={record && record.status === 'Active' ? true : false}
          onChange={(e) => handleStatus(e, record, 'status')}
        />
      );
    },
  }, {
    title: 'Action',
    dataIndex: 'action',
    render: (text, record) => {
      return (
        <>
          {localStorage.getItem('userRole') === 'admin' &&
            <Button
              type="primary"
              onClick={() => handleModal(record, 'Edit')}
              style={{ marginRight: '5px' }}
            >
              Edit
            </Button>
          }
          <Popconfirm
            title="Are you sure delete this user?"
            onConfirm={() => handleStatus(false, record, 'del')}
            okText="Yes"
            cancelText="No">
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </>
      );
    }
  }]

  const portalUserColumns = [{
    title: 'First Name',
    dataIndex: 'fname'
  }, {
    title: 'Last Name',
    dataIndex: 'lname'
  }, {
    title: 'Email',
    dataIndex: 'email'
  }, {
    title: 'Role',
    dataIndex: 'role'
  }, {
    title: 'Customer Type',
    dataIndex: 'customerType'
  }, {
    title: 'Account ID / Sales Rep ID',
    dataIndex: 'accountID',
    render: (text, record) => {
      return (
        <>
          <span>{record.customerType === 'Representative' ? record.salesRepID.join(', ') : record.customerType === 'Distributor' ? record.accountID.join(', ') : ''}</span>
        </>
      );
    }
  }, {
    title: 'Activate',
    dataIndex: 'status',
    render: (text, record) => {
      return (
        <Switch
          defaultChecked={record && record.status === 'Active' ? true : false}
          onChange={(e) => handleStatus(e, record, 'status')}
        />
      );
    },
  }, {
    title: 'Action',
    dataIndex: 'action',
    render: (text, record) => {
      return (
        <>
          {localStorage.getItem('userRole') === 'admin' &&
            <Button
              type="primary"
              onClick={() => handleModal(record, 'Edit')}
              style={{ marginRight: '5px' }}
            >
              Edit
            </Button>
          }
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleStatus(false, record, 'del')}
            okText="Yes"
            cancelText="No">
            <Button type="danger" style={{ marginRight: '5px' }} >Delete</Button>
          </Popconfirm>
          <Button type="warning" onClick={() => handleResetPassword(record)} style={{ margin: '5px 5px 5px 0px' }} >Reset Password</Button>
          {
            record.pendingRep && (
              <Popconfirm
                title="Are you sure to decline this user?"
                onConfirm={() => handleDecline(record)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="warning" style={{ margin: '5px 0px 5px 0px' }} >Decline</Button>
              </Popconfirm>
            )
          }



        </>
      );
    }
  }]

  return (
    <Table
      className='my-10'
      columns={user === 'portalUser' ? portalUserColumns : dashboardUserColumns}
      dataSource={users}
      loading={loading}
    />
  );
}

export { List }
