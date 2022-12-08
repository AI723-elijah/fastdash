import React, { Component } from 'react';
import { DeleteOutlined, EditOutlined, LinkOutlined, PlusOutlined } from '@ant-design/icons';
import { Tree, Spin, Popconfirm } from 'antd';

import './Styles/List.scss';
import 'antd/dist/antd.css'

const { TreeNode } = Tree;

class List extends Component {
  loop = data => data && data.map(item => {
    if (item && item.children && item.children.length > 0) {
      return (
        <TreeNode
          key={item.key}
          title={
            <span>
              {item.channelCategoryID} - {item.categoryName} ({item.products} Products)
              {localStorage.getItem('userRole') !== 'SEO' &&
                <PlusOutlined
                  className='mx-10 icon-btn'
                  onClick={() => this.props.handleModal(item.channelCategoryID)} />
              }
              <EditOutlined className='edit-icon' onClick={() => this.props.handleEdit(item)} />
              {localStorage.getItem('userRole') !== 'SEO' &&
                <>
                  <Popconfirm
                    title="Deleting this category will also delete all it's child categories as well, are you sure to delete this category?"
                    onConfirm={() => this.props.handleRemove(item.channelCategoryID)}
                    okText='Yes'
                    cancelText='No'
                  >
                    <DeleteOutlined className='mx-10 delete-icon' />
                  </Popconfirm>
                  <LinkOutlined
                    className='icon-btn'
                    onClick={() => this.props.handleProductModal(item.channelCategoryID)} />
                  <Popconfirm
                    title="Deleting category banner, are you sure to delete this banner?"
                    onConfirm={(e) => this.props.handleUpdateAPI({
                      ...item,
                      categoryImage: ''
                    })}
                    okText='Yes'
                    cancelText='No'
                  >
                    <DeleteOutlined className='mx-10 delete-icon' />
                  </Popconfirm>
                </>
              }

            </span>
          }
        >
          {this.loop(item.children)}
        </TreeNode>
      );
    }
    return (
      <TreeNode
        key={item.key}
        title={
          <span>
            {item.channelCategoryID} - {item.categoryName} ({item.products} Products)
            {localStorage.getItem('userRole') !== 'SEO' &&
              <PlusOutlined
                className='mx-10 icon-btn'
                onClick={() => this.props.handleModal(item.channelCategoryID)} />
            }
            <EditOutlined className='edit-icon' onClick={() => this.props.handleEdit(item)} />
            {localStorage.getItem('userRole') !== 'SEO' &&
              <>
                <Popconfirm
                  title="Are you sure to delete this category?"
                  onConfirm={() => this.props.handleRemove(item.channelCategoryID)}
                  okText='Yes'
                  cancelText='No'
                >
                  <DeleteOutlined className='mx-10 delete-icon' />
                </Popconfirm>
                <LinkOutlined
                  className='icon-btn'
                  onClick={() => this.props.handleProductModal(item.channelCategoryID)} />
              </>
            }
          </span>
        }
      />
    );
  });

  render() {
    const { categories, loading, categoriesLoading, handleDrop } = this.props;

    return (
      <Spin spinning={loading || categoriesLoading}>
        <Tree
          className='categories-list'
          defaultExpandAll
          draggable
          blockNode
          onDrop={handleDrop}
        >
          {this.loop(categories)}
        </Tree>
      </Spin>
    );
  }
}

export { List }
