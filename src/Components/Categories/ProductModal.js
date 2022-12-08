import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { InputNumber, Select, Table, Spin, Button, Popconfirm } from 'antd';

const { Option } = Select;

const ProductModal = ({
  loading,
  products,
  associatedTo,
  handleSearch,
  handleSave,
  handleDeleteAssociated,
  updateProductSort,
  categoryID,
  handleModal,
  startLoading,
  stopLoading,
  updateElasticSearchIndex
}) => {

  const handleSort = async (product, e) => {
    const payload = {
        productID: product.productID,
        sorting: e.target.value
    }
    if (e.target.value) {
      startLoading()
      await updateProductSort(payload)
      await updateElasticSearchIndex(payload.productID)
      stopLoading()
      handleModal(categoryID,true)
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku'
    },
    {
      title: 'Sort',
      dataIndex: 'sort',
      width:100,
      render: (text, record) => {
        return (
          <InputNumber
            className='width-100'
            defaultValue={record.sorting}
            onBlur={(e) => handleSort(record, e)}
          />
        )
  
      }
  
    }, 
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',

      render: (text, record) => {
        return (
          <div>
            <Popconfirm 
                title="Are you sure to detach this product?"
                onConfirm={() => handleDeleteAssociated(record)}
                okText="Yes"
                cancelText="No">
              <Button type="danger" value="small" icon={<DeleteOutlined />}></Button>
            </Popconfirm>
          </div>
        );
      }
    }
  ]
  const data = loading ? [] : products
  return (
    <>
      <label>Search for a product to associate to this category</label>
      <Select
        className='width-100'
        size='large'
        showSearch
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        notFoundContent={loading ? <Spin size='small' /> : null}
        onSearch={handleSearch}
        onChange={handleSave}
      >
        { data.map(p =>
          <Option key={p.ProductID} value={p.ProductID}>{p.sku} - {p.name}</Option>
        )}
      </Select>
      <div className='my-10'>
        <label>Existing Products</label>
        <Table loading={associatedTo.length === 0 && loading} dataSource={associatedTo} columns={columns} rowKey="productID"/>
      </div>
    </>
  );
}

export { ProductModal };
