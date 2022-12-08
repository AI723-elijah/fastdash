import { Tree } from "antd";
import React, { useState, useEffect } from "react";

const CategoriesTab = (props) => {
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  useEffect(() => {
    if (props.productCategories) {
      let cat = props.productCategories.map((c) => c.channelCategoryID);
      let uniqueChars = [];
      cat.forEach((element) => {
        if (!uniqueChars.includes(element)) {
          uniqueChars.push(element);
        }
      });
      setCheckedKeys(uniqueChars);
    }
  }, [props.productCategories]);

  const onExpand = (expandedKeysValue) => {
    // console.log('onExpand', expandedKeysValue);

    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue, values) => {
    const { handleStateChange, removeAssociatedProduct } = props;
    let idsToBeDeleted = [];
    let productCategories = [...props.productCategories];
    const prevChecked = productCategories.map((c) => c.channelCategoryID);
    if (values.checked) {
      let newChecked = values.checkedNodes.filter(
        (c) => prevChecked.indexOf(parseInt(c)) === -1
      );
      newChecked = newChecked.map((c) => ({
        channelCategoryID: parseInt(c.key),
      }));
      productCategories = [...productCategories, ...newChecked];
    } else {
      productCategories = productCategories.filter((c) => {
        const exist = values.checkedNodes.some(
          (v) => v.key === c.channelCategoryID
        );
        if (exist === false) {
          if (c.productCategoryID) {
            idsToBeDeleted.push(c.productCategoryID);
          }
        }
        return exist;
      });
    }
    console.log(idsToBeDeleted);
    if (idsToBeDeleted && idsToBeDeleted.length > 0) {
      removeAssociatedProduct(idsToBeDeleted);
    }
    handleStateChange(productCategories, "productCategories");
    let uniqueChars = [];
    checkedKeysValue.forEach((element) => {
      if (!uniqueChars.includes(element)) {
        uniqueChars.push(element);
      }
    });
    setCheckedKeys(uniqueChars);
  };

  const onSelect = (selectedKeysValue, info) => {
    setSelectedKeys(selectedKeysValue);
  };

  const loop = (data) => {
    let resp = [];
    data.map((item) =>
      resp.push({
        key: item.key,
        title: `${item.channelCategoryID} - ${item.categoryName}`,
        children:
          item && item.children && item.children.length > 0
            ? loop(item.children)
            : [],
      })
    );
    return resp;
  };

  return (
    <>
      <Tree
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={(checkedKeysValue, values) =>
          onCheck(checkedKeysValue, values)
        }
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={loop(props.categories)}
      />
    </>
  );
};

// import React, { Component } from 'react';
// import { Tree } from 'antd';

// const { TreeNode } = Tree;

// class CategoriesTab extends Component {
//   handleCategory = (v, e) => {
//     const { handleStateChange, removeAssociatedProduct } = this.props;

//     let productCategories = [...this.props.productCategories];
//     const prevChecked = productCategories.map(c => c.channelCategoryID);
//     if(e.checked) {
//       let newChecked = v.checked.filter(c => prevChecked.indexOf(parseInt(c)) === -1);
//       newChecked = newChecked.map(c => ({ channelCategoryID: parseInt(c) }));
//       productCategories = [...productCategories, ...newChecked];
//     } else {

//       productCategories = productCategories.filter(c => {
//         const index = v.checked.indexOf(c.channelCategoryID.toString());
//         if(index === -1) {
//           removeAssociatedProduct(c.productCategoryID);
//         }
//         return index > -1;
//       })
//     }
//     handleStateChange(productCategories, 'productCategories');
//   }

//   loop = data =>
//     data.map(item => {
//       if (item.children) {
//         return (
//           <TreeNode
//             key={item.key}
//             title={`${item.channelCategoryID} - ${item.categoryName}`}
//           >
//             {this.loop(item.children)}
//           </TreeNode>
//         );
//       }
//       return <TreeNode
//         key={item.key}
//         title={`${item.channelCategoryID} - ${item.categoryName}`}
//       />;
//     });

//   render() {
//     const { categories, productCategories } = this.props;
//     const selectedKeys = productCategories.map(c => c.channelCategoryID);

//     return (
//       <Tree
//         className='categories-list'
//         checkable
//         defaultExpandAll
//         checkStrictly
//         checkedKeys={selectedKeys}
//         onCheck={(v, e) => this.handleCategory(v, e)}
//       >
//         {this.loop(categories)}
//       </Tree>
//     );
//   }
// }

export { CategoriesTab };
