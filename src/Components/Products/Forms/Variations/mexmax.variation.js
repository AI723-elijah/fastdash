import React, { Component } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Row, Col, Input, Collapse, Select, InputNumber } from 'antd';
import { Images } from './Images/variationImages';

import './Variations.scss';

const { Panel } = Collapse;
const { Item } = Form;
const { Option } = Select;

class VariationsTab extends Component {

  handleChange = (e, name, i) => {
    const { handleStateChange } = this.props;
    let productRelations = [...this.props.productRelations];

    productRelations[i].childProductDetails[name] = e;
    handleStateChange(productRelations, 'productRelations');
  }

  handleUOM = (e, i) => {
    const { handleStateChange, product } = this.props;
    let productRelations = [...this.props.productRelations];

    let index = productRelations[i].childProductDetails.productAttributes.findIndex(c => c.attribute.attributeName === 'sellingUOM');
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

  render() {
    const { productRelations, removeProductVariationImage, match: { params: { id } }, form: { getFieldDecorator } } = this.props;

    return <>
      <div className='mx-15 d-flex-row justify-end'>
        <Button onClick={this.addToArray}>Add Variation</Button>
      </div>
      <Collapse
        className='my-10 variation-collapse'
        bordered={false}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      >
        { productRelations.map((p, i) => {
          const uom = p.childProductDetails.productAttributes.find(c => c.attribute.attributeName === 'sellingUOM') || '';

          return (
            <Panel key={i} header={p.childProductDetails.sku ? p.childProductDetails.sku : `Variation ${i+1}`} className='variation-panel' >
              <Row className='variation-row' gutter={16}>
                <Col xs={24} sm={8}>
                  <label>SKU</label>
                  <Item>
                    { getFieldDecorator(`variation_sku${i+1}`, {
                      rules: [
                        { required: true, message: 'Please enter SKU for this variation.' }
                      ],
                      setFieldsValue: p.childProductDetails.sku,
                      initialValue: p.childProductDetails.sku
                    })(
                      <Input
                        name='sku'
                        disabled={id ? true : false}
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
                      setFieldsValue: p.childProductDetails.upc,
                      initialValue: p.childProductDetails.upc
                    })(
                      <Input
                        name='upc'
                        onChange={e => this.handleChange(e.target.value, e.target.name, i)}
                      />
                    )}
                  </Item>
                </Col>
                <Col xs={24} sm={8}>
                  <label>Selling UOM</label>
                  <Item>
                    { getFieldDecorator(`variation_UOM${i+1}`, {
                      rules: [
                        { required: true, message: 'Please enter Selling UOM for this variation.' }
                      ],
                      setFieldsValue: uom.value,
                      initialValue: uom.value
                    })(
                      <Input
                        name='sellingUOM'
                        onChange={e => this.handleUOM(e, i)}
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
                      setFieldsValue: p.childProductDetails.sorting,
                      initialValue: p.childProductDetails.sorting
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
                      setFieldsValue: p.childProductDetails.price,
                      initialValue: p.childProductDetails.price
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
                      setFieldsValue: p.childProductDetails.quantity,
                      initialValue: p.childProductDetails.quantity
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
                      setFieldsValue: p.childProductDetails.status,
                      initialValue: p.childProductDetails.status
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
          )
        })}
      </Collapse>
    </>;
  }
}

export default Form.create()(VariationsTab);
