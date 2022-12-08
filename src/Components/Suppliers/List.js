import React from 'react';
import { Table } from 'antd';

const columns = [{
  title: 'Supplier ID',
  dataIndex: 'supplierID',
  sorter: (a, b) => {
    if (a.supplierID > b.supplierID) return 1;
    if (a.supplierID < b.supplierID) return -1;
    return 0;
  }
}, {
  title: 'Supplier Name',
  dataIndex: 'supplierName',
  sorter: (a, b) => {
    if (a.supplierName.toLowerCase() > b.supplierName.toLowerCase()) return 1;
    if (a.supplierName.toLowerCase() < b.supplierName.toLowerCase()) return -1;
    return 0;
  }
}, {
  title: 'Actions',
  dataIndex: 'actions'
}];

const List = ({ suppliers, loading }) => {
  return (
    <Table className='my-10' columns={columns} dataSource={suppliers} loading={loading} />
  );
}

export { List }
