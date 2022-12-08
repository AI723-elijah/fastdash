import React, { Component } from 'react';
import { CaretRightOutlined, DeleteOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Row, Col, Input, Collapse, Select, InputNumber, Modal } from 'antd';
import { Images } from './Images/variationImages';

import './Variations.scss';

const { Panel } = Collapse;
const { Item } = Form;
const { Option } = Select;

class VariationsTab extends Component {
  constructor(){
    super();
    this.state = {
      modalOpen: false,
      selectedVariation: null
    };
  }
  handleChange = (e, name, i) => {
    const { handleStateChange } = this.props;
    let productRelations = [...this.props.productRelations];

    productRelations[i].childProductDetails[name] = e;
    handleStateChange(productRelations, 'productRelations');
  }

  handleColor = (e, i) => {
    const { handleStateChange, product } = this.props;
    let productRelations = [...this.props.productRelations];

    let index = productRelations[i].childProductDetails.productAttributes.findIndex(c => c.attribute.attributeName === 'Color');
    productRelations[i].childProductDetails.productAttributes[index].value = e.target.value;
    productRelations[i].childProductDetails.sku = `${product.sku}_${e.target.value}`;

    handleStateChange(productRelations, 'productRelations');
  }

  addToArray = () => {
    const { handleAddToArray, productAttributes, productRelations } = this.props;
    const image = {
      channelID: 1,
      image: '',
      sort: productRelations.length + 1
    }
    let emptyAttributes = [];
    if(productRelations.length > 0) {
      productRelations[0].childProductDetails.productAttributes.map(p => {
        const n = Object.assign({}, p);
        delete n['productAttributeID'];
        emptyAttributes.push(n);
      });
    } else {
      productAttributes.map(p => {
        const n = Object.assign({}, p);
        emptyAttributes.push(n);
      });
    }
    const product = Object.assign({}, this.props.product);
    const variation = {
      childProductDetails: { ...product, type: 'child', productAttributes: emptyAttributes }
    };
    variation.childProductDetails.images = [{ ...image }];
    delete variation.childProductDetails['productID'];

    handleAddToArray('productRelations', variation);
  }

  handleDelete = i => {
    this.setState({modalOpen: true, selectedVariation: i})
  }

  deleteVariation = () => {
    this.setState({modalOpen: false}, () => {
      const { removeProductsVariation } = this.props;
      let productRelations = [...this.props.productRelations];
      let productID = productRelations[this.state.selectedVariation].childProductDetails.productID;
      if(productID){
        removeProductsVariation(productID);
      }
      productRelations.splice(this.state.selectedVariation, 1);
      this.props.handleStateChange(productRelations, 'productRelations');
    });
  }
  render() {
    const { productRelations, removeProductVariationImage, match: { params: { id } }, form: { getFieldDecorator } } = this.props;

    return <>
      <Modal
        title="Delete Variation"
        visible={this.state.modalOpen}
        onOk={this.deleteVariation}
        onCancel={()=>{this.setState({modalOpen: false})}}
      >
        <h3>Are you sure you want to delete this variation? </h3>
        <p>Note: This will delete this variation and its related information</p>
      </Modal>
      <div className='mx-15 d-flex-row justify-end'>
        <Button onClick={this.addToArray}>Add Variation</Button>
      </div>
      <Collapse
        className='my-10 variation-collapse'
        bordered={false}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      >
        { productRelations.map((p, i) => {
          const color = p.childProductDetails ? p.childProductDetails.productAttributes.find(c => c.attribute.attributeName === 'Color') || '' : '';
          const child = p.childProductDetails || {};

          return (
            <Panel
              className='variation-panel'
              key={i}
              header={child.sku || `Variation ${i+1}`}
              // extra={(!id || !child.productID) && <Icon type='delete' onClick={() => this.handleDelete(i)} />}
              extra={<DeleteOutlined onClick={() => this.handleDelete(i)} />}
            >
              <Row className='variation-row' gutter={16}>
                <Col xs={24} sm={8}>
                  <label>SKU</label>
                  <Item>
                    { getFieldDecorator(`variation_sku${i+1}`, {
                      rules: [
                        { required: true, message: 'Please enter SKU for this variation.' }
                      ],
                      setFieldsValue: child.sku,
                      initialValue: child.sku
                    })(
                      <Input
                        name='sku'
                        onChange={e => this.handleChange(e.target.value, e.target.name, i)}
                      />
                    )}
                  </Item>
                </Col>
                <Col xs={24} sm={8}>
                  <label>UPC</label>
                  <Item>
                    { getFieldDecorator(`variation_upc${i+1}`, {
                      rules: [
                        { required: true, message: 'Please enter UPC for this variation.' }
                      ],
                      setFieldsValue: child.upc,
                      initialValue: child.upc
                    })(
                      <Input
                        name='upc'
                        onChange={e => this.handleChange(e.target.value, e.target.name, i)}
                      />
                    )}
                  </Item>
                </Col>
                <Col xs={24} sm={8}>
                  <label>Color</label>
                  <Item>
                    { getFieldDecorator(`variation_color${i+1}`, {
                      rules: [
                        { required: true, message: 'Please enter Color for this variation.' }
                      ],
                      setFieldsValue: color.value,
                      initialValue: color.value
                    })(
                      <Input
                        name='color'
                        onChange={e => this.handleColor(e, i)}
                      />
                    )}
                  </Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} sm={8}>
                  <label>Sort</label>
                  <Item>
                    { getFieldDecorator(`variation_sorting${i+1}`, {
                      setFieldsValue: child.sorting,
                      initialValue: child.sorting
                    })(
                      <InputNumber
                        className='width-100'
                        name='sorting'
                        onChange={e => this.handleChange(e, 'sorting', i)}
                      />
                    )}
                  </Item>
                </Col>
                <Col xs={24} sm={8}>
                  <label>Price</label>
                  <Item>
                    { getFieldDecorator(`variation_price${i+1}`, {
                      setFieldsValue: child.price,
                      initialValue: child.price
                    })(
                      <InputNumber
                        className='width-100'
                        name='price'
                        onChange={e => this.handleChange(e, 'price', i)}
                      />
                    )}
                  </Item>
                </Col>
                <Col xs={24} sm={8}>
                  <label>Quantity</label>
                  <Item>
                    { getFieldDecorator(`variation_quantity${i+1}`, {
                      setFieldsValue: child.quantity,
                      initialValue: child.quantity
                    })(
                      <InputNumber
                        className='width-100'
                        name='quantity'
                        onChange={e => this.handleChange(e, 'quantity', i)}
                      />
                    )}
                  </Item>
                </Col>
                <Col xs={24} sm={8}>
                  <label>Status</label>
                  <Item>
                    { getFieldDecorator(`variation_status${i+1}`, {
                      rules: [
                        { required: true, message: 'Please select Status for this variation.' }
                      ],
                      setFieldsValue: child.status,
                      initialValue: child.status
                    })(
                      <Select
                        className='width-100'
                        onChange={e => this.handleChange(e, 'status', i)}
                      >
                        <Option value='active'>Active</Option>
                        <Option value='inactive'>Inactive</Option>
                      </Select>
                    )}
                  </Item>
                </Col>
              </Row>
              <Images
                removeProductVariationImage={removeProductVariationImage}
                productRelations={productRelations}
                productRelation={p}
                parentIndex={i}
                handleStateChange={this.props.handleStateChange}
                startLoading={this.props.startLoading}
                stopLoading={this.props.stopLoading}
              />
            </Panel>
          );
        })}
      </Collapse>
    </>;
  }
}

export default Form.create()(VariationsTab);
