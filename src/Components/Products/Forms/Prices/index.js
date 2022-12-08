import React, { Component } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Row, Col, Card, InputNumber } from 'antd';

const { Item } = Form;

class Prices extends Component {
  constructor() {
    super();

    this.state = {
      focus: ''
    }
  }

  handleChange = (e, name, i) => {
    const { handleStateChange, product: { price } } = this.props;
    let productTierPrices = [...this.props.productTierPrices];

    if(name === 'customPrice') {
      if(e > price ) {
        return;
      }
      productTierPrices[i].percentage = parseFloat(e/price * 100).toFixed(2);
    }
    if(name === 'percentage') {
      if(e > 100) {
        return;
      }
      productTierPrices[i].customPrice = parseFloat(e/100 * price).toFixed(2);
    }
    productTierPrices[i][name] = e;
    handleStateChange(productTierPrices, 'productTierPrices');
  }

  handleFocus = name => {
    this.setState({ focus: name });
  }

  handleBlur = () => {
    this.setState({ focus: '' });
  }

  handleDelete = i => {
    let productTierPrices = [...this.props.productTierPrices];

    productTierPrices.splice(i, 1);
    this.props.handleStateChange(productTierPrices, 'productTierPrices');
  }

  render() {
    const { productTierPrices, handleAddToArray, form: { getFieldDecorator }, match: { params: { id } } } = this.props;
    const { focus } = this.state;
    const tierPrice = {
      percentage: '',
      qtyMaximum: '',
      qtyMinimum: '',
      customPrice: ''
    }

    return <>
      <div className='mx-15 d-flex-row justify-end'>
        <Button onClick={() => handleAddToArray('productTierPrices', tierPrice)}>Add Tier Price</Button>
      </div>
      { productTierPrices.map((e, i) => {
        return (
          <Row key={i} className='my-10' gutter={16}>
            <Card
              hoverable
              title={
                <div className='d-flex-row justify-between'>
                  Product Tier Prices
                  { !id && <DeleteOutlined onClick={() => this.handleDelete(i)} />}
                </div>
              }
            >
              <Col xs={24} sm={6}>
                <label>Minimum</label>
                <Item>
                  { getFieldDecorator(`prices_minimumQuantity${i+1}`, {
                    rules: [
                      { required: true, message: 'Please enter Minimum Quantity' }
                    ],
                    setFieldsValue: e.qtyMinimum,
                    initialValue: e.qtyMinimum
                  })(
                    <InputNumber
                      className='width-100'
                      name='qtyMinimum'
                      onChange={(eve) => this.handleChange(eve, 'qtyMinimum', i)}
                    />
                  )}
                </Item>
              </Col>
              <Col xs={24} sm={6}>
                <label>Maximum</label>
                <Item>
                  { getFieldDecorator(`prices_maximumQuantity${i+1}`, {
                    rules: [
                      { required: true, message: 'Please enter Maximum Quantity' }
                    ],
                    setFieldsValue: e.qtyMaximum,
                    initialValue: e.qtyMaximum
                  })(
                    <InputNumber
                      className='width-100'
                      name='qtyMaximum'
                      onChange={(eve) => this.handleChange(eve, 'qtyMaximum', i)}
                    />
                  )}
                </Item>
              </Col>
              <Col xs={24} sm={6}>
                <label>Percentage Off</label>
                <Item>
                  { getFieldDecorator(`price_percentage${i+1}`, {
                    setFieldsValue: e.percentage,
                    initialValue: e.percentage
                  })(
                    <InputNumber
                      className='width-100'
                      disabled={focus === 'customPrice'}
                      name='percentage'
                      onChange={(eve) => this.handleChange(eve, 'percentage', i)}
                      onFocus={() => this.handleFocus('percentage')}
                      onBlur={this.handleBlur}
                    />
                  )}
                </Item>
              </Col>
              <Col xs={24} sm={6}>
                <label>Price</label>
                <Item>
                  { getFieldDecorator(`price_percentage${i+1}`, {
                    setFieldsValue: e.customPrice,
                    initialValue: e.customPrice
                  })(
                    <InputNumber
                      className='width-100'
                      disabled={focus === 'percentage'}
                      name='customPrice'
                      onChange={(eve) => this.handleChange(eve, 'customPrice', i)}
                      onFocus={() => this.handleFocus('customPrice')}
                      onBlur={this.handleBlur}
                    />
                  )}
                </Item>
              </Col>
            </Card>
          </Row>
        );
      })}
    </>;
  }
}

let PricesTab = Form.create()(Prices);
export { PricesTab };
