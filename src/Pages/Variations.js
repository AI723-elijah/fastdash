import React, { Component } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Card, Button, Input, message } from 'antd';
import debounce from 'lodash/debounce';
import { ProductList } from '../Components/Products/ProductList';

import './Styles/Products.scss';

class Variations extends Component {
  constructor() {
    super();
    this.state = {
      selectedProducts: [],
      bulkPrice: null,
      showBulkUpdateInput: false
    }
    this.handleSearch = debounce(this.handleSearch, 800);
  }

  async componentDidMount() {
    const { getVariations, searchVariations, query } = this.props;
    if(query) {
      searchVariations(query, 0);
    } else {
      getVariations(0);
    }
  }

  componentWillUnmount() {
    const { emptyProducts } = this.props;

    emptyProducts();
  }

  loadMore = () => {
    const { getVariations, searchVariations, variations, query } = this.props;
    if(query) {
      searchVariations(query, variations.length);
    } else {
      getVariations(variations.length);
    }
  }

  handleAdd = (route) => {
    const { history } = this.props;

    history.push(route);
  }

  handleInput = e => {
    const { saveSearchCriteria } = this.props;
    saveSearchCriteria(e.target.value);
    this.handleSearch(e.target.value);
  }

  handleSearch = e => {
    const { searchVariations, getVariations, emptyProducts } = this.props;
    if (e) {
      searchVariations(e, 0)
        .catch(() => {
          message.error('Cannot find any product', 5);
        });
    } else {
      emptyProducts();
      getVariations(0);
    }
  }

  handleSelectList = (e, productID) => {
    let index = this.state.selectedProducts.findIndex(id => id === productID);
    let updatedSelectedProducts = []
    if(index > -1){
      updatedSelectedProducts = this.state.selectedProducts.filter(id => id !== productID);
      this.setState({
        selectedProducts: [...updatedSelectedProducts]
      }, () => {
        if(this.state.selectedProducts.length > 0){
          this.setState({
            showBulkUpdateInput: true
          })
        }else{
          this.setState({
            showBulkUpdateInput: false
          })
        }
      })
    }else{
      updatedSelectedProducts = this.state.selectedProducts;
      updatedSelectedProducts.push(productID);
      this.setState({
        selectedProducts: [...updatedSelectedProducts]
      }, () => {
        if(this.state.selectedProducts.length > 0){
          this.setState({
            showBulkUpdateInput: true
          })
        }else{
          this.setState({
            showBulkUpdateInput: false
          })
        }
      })
    }
    
  }

  bulkPriceUpdateHandler = () => {
    if(this.state.bulkPrice === null){
      message.error("Please Enter a Value for Price ", 0.5)
    }else{
      const {updateVariationsPriceInBulk } = this.props;
      updateVariationsPriceInBulk({productIDs: [...this.state.selectedProducts], price: this.state.bulkPrice })
    }

  }
  render() {
    const { variations, pagination, query } = this.props;

    return (
      <Card title='Product Variations' className='width-100 products-list'>
        <Input
          className='search-box'
          placeholder='Search Products'
          onChange={this.handleInput}
          value={query}
          addonAfter={<SearchOutlined />}
        />
         {
           this.state.showBulkUpdateInput &&
           <>
            <Input
              className='price-update-box'
              type="number"
              placeholder="Set new Price for Selected Products"
              onChange={(e) => {
                let { value } = e.target
                this.setState({
                  bulkPrice: value
                })
              }}
              value={this.state.bulkPrice}
            />
            <Button onClick={this.bulkPriceUpdateHandler}>Update</Button>
           </>
         }
        <ProductList
          selected={this.state.selectedProducts}
          handleSelectList={this.handleSelectList}
          loading={this.props.loading}
          products={variations}
          handleAdd={this.handleAdd}
          pathname={'variation'}
        />
        { variations.length >= 50 && pagination.count > variations.length &&
          <div className='d-flex-row justify-center'>
            <Button onClick={this.loadMore}>Load More</Button>
          </div>
        }
      </Card>
    );
  }
}

export { Variations };
