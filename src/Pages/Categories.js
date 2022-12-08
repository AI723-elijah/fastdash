import React, { Component } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Card, Button, message } from 'antd';
import debounce from 'lodash/debounce';
import firebase from 'firebase/app';
import 'firebase/storage';

import { IMModal } from '../Common/Modal';
import { List } from '../Components/Categories/List';
import { CategoryForm } from '../Components/Categories/CategoryForm';
import { ProductModal } from '../Components/Categories/ProductModal';

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      productModal: false,
      categoryImage: '',
      categoryID: '',
      parentID: 0,
      category: {},
      associatedProducts: [],
      categoriesLoading: false,
      categoriesList: []
    };

    this.handleSearch = debounce(this.handleSearch, 500);
  }

  componentDidMount() {
    const { getCategories } = this.props;
     getCategories();
  }

  componentDidUpdate(oldProps) {
    const { categories } = this.props;
    if (categories !== oldProps.categories) {
      this.setState({ categoriesList: categories });
    }
  }

  handleUpdateAPI = async (values) => {
  
    try {
      const { updateCategory, getCategories } = this.props;
      await updateCategory(values)
      message.success('Category has been updated', 5);
      this.handleModal();
      getCategories();
    } catch (error) {
      message.error(error.payload.message, 5)
    }
  }

  handleSortUpdate = async (values) => {
    const { updateCategory, getCategories } = this.props;
    await updateCategory(values)
    await getCategories();
  }

  handlePosUpdateAPI = async (values) => {
    const { updateCategory, getCategories } = this.props;
    await values && values.map((val) => updateCategory(val))
    getCategories();
  }

  handleModal = e => {
    if (!this.state.open) {
      this.setState({ parentID: e });
    }
    this.setState({ open: !this.state.open, category: {} });
  }

  handleProductModal = async (e, isRefreshing) => {

    await this.props.getByCategory(e);
    this.setState({
      associatedProducts: this.props.associatedTo
    })
    const { productModal } = this.state;
    if (!isRefreshing) {
      this.setState({ productModal: !productModal, categoryID: productModal ? '' : e });
    }
  }

  handleEdit = e => {
    const { category } = this.state;
    if (category.channelCategoryID) {
      this.setState({ category: {} });
    } else {
      this.setState({ category: e, open: true })
    }
  }

  handleSave = (e, form) => {
    const { category } = this.state;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const { saveCategory, getCategories } = this.props;
        values.categoryImage = this.state.categoryImage;
        values.channelID = 0;
        values.position = parseInt(values.position)
 
        if (category && category.channelCategoryID) {
          values.descriptionTags = values.descriptionTags.join()
          values.titleMetaTags = values.titleMetaTags.join()
          this.handleEdit();
          values = { ...category, ...values };
          this.handleUpdateAPI(values);
      
        } else {
          values.categoryID = this.props.categories[this.props.categories.length - 1].channelCategoryID + 1;
          values.parentID = this.state.parentID;
          values.descriptionTags = values.descriptionTags.join()
          values.titleMetaTags = values.titleMetaTags.join()

          this.handleModal();
          saveCategory(values)
            .then(() => {
              message.success('Category has been added', 5);
              getCategories();
            })
            .catch(err => message.error(err.payload.message, 5));
        }
      }
    });
  }

  handleRemove = (id) => {
    const { removeCategory, getCategories } = this.props;
    removeCategory(id)
      .then(() => {
        message.success('Category has been removed', 5);
        getCategories();
      })
  }

  handleUploadStart = () => {
    this.props.startLoading();
  }

  handleUploadSuccess = filename => {
    message.success('Image Uploaded Successfully!', 5);
    if (process.env.REACT_APP_NAME === 'westgate') {
      this.props.stopLoading();
      this.setState({ categoryImage: filename });
    } else {
      firebase
        .storage()
        .ref('categoryImages')
        .child(filename)
        .getDownloadURL()
        .then(url => {
          this.props.stopLoading();
          this.setState({ categoryImage: url });
        });
    }
  }

  handleSearch = (e) => {
    if (e.length > 2) {
      this.props.quickSearch(e);
    }
  }

  handleAssociate = (e) => {
    const { associateToProduct, getCategories } = this.props;
    const { associatedProducts } = this.state;
    const { categoryID } = this.state
    const params = {
      productID: e,
      channelCategoryID: categoryID
    }
    const associated = associatedProducts.findIndex(a => a.productID === e);
    if (associated === -1) {
      let selectedProduct = this.props.products.find(p => p.ProductID === e);
      selectedProduct['productID'] = selectedProduct['ProductID']
      delete selectedProduct['ProductID']
      selectedProduct.inState = true;

      this.setState({
        associatedProducts: [selectedProduct, ...this.state.associatedProducts]
      })

      associateToProduct(params)
        .then((res) => {
          let updatedProduct = this.state.associatedProducts.find(p => p.productID === res.payload.productID);
          updatedProduct.productCategoryID = res.payload.productCategoryID;
          this.state.associatedProducts.map(p => p.productID === res.payload.productID ? updatedProduct : p);
          message.success('Category has been associated with selectedProduct. You can select another product to associate this category')
          getCategories();
        })
        .catch(err => message.error(err.payload.message, 5));
    } else {
      message.error('This product is already associated with category, please select a different product')
    }
  }

  getParent = (drop) => {
    const { categories } = this.props;
    const pos = drop.props.pos.split('-').map(e => parseInt(e));
    const l = pos.length;
    if (l === 3) {
      return { parent: categories[pos[1]].channelCategoryID, position: pos[l - 1] };
    }
    if (l === 4) {
      return { parent: categories[pos[1]].children[pos[2]].channelCategoryID, position: pos[l - 1] };
    }

    return { parent: 0, position: pos[l - 1] }
  }

  arrayMove(children, oldIndex, newIndex) {
    const arr = [...children]
    let cutOut = arr.splice(oldIndex, 1)[0]
    if (newIndex > children.length) {
      arr.push(cutOut)
    } else {
      arr.splice(newIndex, 0, cutOut)
    }

    return arr
  };

  updateIndex = (info, categories) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (String(data[i].key) === String(key)) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };

    const data = JSON.parse(JSON.stringify(categories));

    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
        dragObj.parentID = item.key
      });
    } else if (
      (info.node.props.children || []).length > 0 &&
      info.node.props.expanded &&
      Number(dropPosition) === 1
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
        dragObj.parentID = item.parentID
        dragObj.position = index
      });
      if (Number(dropPosition) === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    return { data, dragObj }
  }

  handleDrop = async (info) => {

    const { flattened, categories } = this.props

    const dropKey = info.node.key;

    const parent = flattened.find(item => String(item.channelCategoryID) === String(dropKey))

    if (localStorage.getItem('userRole') === 'SEO') {
      message.error('You do not have the permission to update category position!', 5)
      return
    }

    this.setState({ categoriesLoading: true })

    if (!info.dropToGap && parent.parentID !== 0) {
      message.error('Sub categories can not have child categories!')
    } else {
      const { data, dragObj } = this.updateIndex(info, categories)

      if (dragObj?.children?.length > 0 && dragObj.parentID !== 0) {
        message.error('Can not merge two main categories!')
      } else {
        if (dragObj.parentID !== 0) {
          const children = data.find(item => String(item.key) === String(dragObj.parentID)).children
          // eslint-disable-next-line
          for (const [index, item] of children.entries()) {
            this.handleSortUpdate({ ...item, position: index })
          }
        } else {
          // eslint-disable-next-line
          for (const [index, item] of data.entries()) {
            this.handleSortUpdate({ ...item, position: index })
          }
        }

        message.success('Category has been updated', 5);
      }
    }

    this.setState({ categoriesLoading: false })
  }

  handleDeleteAssociated = item => {
    const { removeAssociatedProduct, getCategories } = this.props;
    let categoryID;

    if (item.inState) {
      categoryID = item.productCategoryID;
    } else {
      categoryID = item.productCategories[0].productCategoryID;
    }
    removeAssociatedProduct(categoryID).then(res => {
      const filteredProds = this.state.associatedProducts.filter(p => p.productID !== item.productID)
      this.setState({
        associatedProducts: filteredProds
      })
      getCategories();
      message.success('Product removed successfully!');
    })
  }
  render() {
    const { open, productModal, categoriesList } = this.state;

    return (
      <Card title='CATEGORIES' className='width-100'>
        {localStorage.getItem('userRole') !== 'SEO' &&
          <div className='d-flex-row justify-end'>
            <Button icon={<PlusSquareOutlined />} onClick={() => this.handleModal(0)}>Add Category</Button>
          </div>
        }
        <List
          categories={categoriesList}
          loading={this.props.loading}
          categoriesLoading={this.state.categoriesLoading}
          handleRemove={this.handleRemove}
          handleModal={this.handleModal}
          handleEdit={this.handleEdit}
          handleProductModal={this.handleProductModal}
          handleDrop={this.handleDrop}
          handleUpdateAPI={this.handleUpdateAPI}
        />
        {open && <IMModal
          title='Category'
          open={open}
          handleModal={this.handleModal}
          handleSave={this.handleSave}
          Component={CategoryForm}
          handleUploadStart={this.handleUploadStart}
          handleUploadSuccess={this.handleUploadSuccess}
          channels={this.props.channels}
          loading={this.props.loading}
          category={this.state.category}
        />}
        {productModal &&
          <IMModal
            updateProductSort={this.props.updateProductSort}
            categoryID={this.state.categoryID}
            getByCategory={this.props.getByCategory}
            startLoading={this.props.startLoading}
            stopLoading={this.props.stopLoading}
            title='Associate Product'
            open={productModal}
            handleModal={this.handleProductModal}
            handleSave={this.handleAssociate}
            handleSearch={this.handleSearch}
            Component={ProductModal}
            products={this.props.products}
            loading={this.props.loading}
            associatedTo={this.state.associatedProducts}
            handleDeleteAssociated={this.handleDeleteAssociated}
            updateElasticSearchIndex={this.props.updateElasticSearchIndex}
          />
        }
      </Card>
    );
  }
}

export { Categories };
