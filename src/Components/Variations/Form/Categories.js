import React, { Component } from 'react';
import { Collapse, Tree } from 'antd';

const { Panel } = Collapse;
const { TreeNode } = Tree;

class Categories extends Component {
  handleCategory = (e) => {
    const { selectCategory } = this.props;
    if(e.checked) {
      const data = {
        channelCategoryID: parseInt(e.node.props.eventKey)
      };
      selectCategory(data);
    } else {
      selectCategory(null, parseInt(e.node.props.eventKey));
    }
  }

  loop = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode
            key={item.key}
            title={`${item.channelCategoryID} - ${item.categoryName}`}
          >
            {this.loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode
        key={item.key}
        title={`${item.channelCategoryID} - ${item.categoryName}`}
      />;
    });

  render() {
    const { categories, variation } = this.props;
    const selectedKeys = variation.productCategories ? variation.productCategories.map(c => c.channelCategoryID) : [];

    return (
      <Collapse className='my-10'>
        <Panel header='Categories' key='categories'>
          <Tree
            className='categories-list'
            checkable
            defaultExpandAll
            checkStrictly
            checkedKeys={selectedKeys}
            onCheck={(v, e) => this.handleCategory(e)}
          >
            {this.loop(categories)}
          </Tree>
        </Panel>
      </Collapse>
    );
  }
}

export { Categories };
