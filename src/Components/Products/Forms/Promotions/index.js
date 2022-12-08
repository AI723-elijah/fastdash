import React, { Component } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Row, Col, Card, Input, DatePicker } from 'antd';
import moment from 'moment';

const { Item } = Form;

class Promotions extends Component {

  handlePromotion = (date, name, i) => {
    const { handleStateChange } = this.props;
    let productPromotions = [...this.props.productPromotions];
    if (name === 'percentage') {
      productPromotions[i][name] = date.target.value;
    } else {
      productPromotions[i][name] = date;
    }

    handleStateChange(productPromotions, 'productPromotions');
  }

  handleDelete = i => {
    let productPromotions = [...this.props.productPromotions];

    productPromotions.splice(i, 1);
    this.props.handleStateChange(productPromotions, 'productPromotions');
  }

  render() {
    const { productPromotions, handleAddToArray, form: { getFieldDecorator }, match: { params: { id } } } = this.props;
    const promotion = {
      startDate: new Date(),
      endDate: new Date(),
      percentage: ''
    };

    return <>
      <div className='mx-15 d-flex-row justify-end'>
        <Button onClick={() => handleAddToArray('productPromotions', promotion)}>Add Promotion</Button>
      </div>
      {productPromotions.map((e, i) => {
        return (
          <Row key={i} className='my-10' gutter={16}>
            <Card
              hoverable
              title={
                <div className='d-flex-row justify-between'>
                  Product Promotion
                  { !id && <DeleteOutlined onClick={() => this.handleDelete(i)} />}
                </div>
              }
            >
              <Col xs={24} sm={8}>
                <label>Start Date</label>
                <Item>
                  { getFieldDecorator(`promotion_startDate${i+1}`, {
                    rules: [
                      { required: true, message: 'Please enter Promotion Start Date' }
                    ],
                    setFieldsValue: moment(e.startDate),
                    initialValue: moment(e.startDate)
                  })(
                    <DatePicker
                      className='width-100'
                      onChange={(date) => this.handlePromotion(date, 'startDate', i)}
                    />
                  )}
                </Item>
              </Col>
              <Col xs={24} sm={8}>
                <label>End Date</label>
                <Item>
                  { getFieldDecorator(`promotion_endDate${i+1}`, {
                    rules: [
                      { required: true, message: 'Please enter Promotion End Date' }
                    ],
                    setFieldsValue: moment(e.endDate),
                    initialValue: moment(e.endDate)
                  })(
                    <DatePicker
                      className='width-100'
                      onChange={(date) => this.handlePromotion(date, 'endDate', i)}
                    />
                  )}
                </Item>
              </Col>
              <Col sm={8} xs={24}>
                <label>Percentage</label>
                <Item>
                  { getFieldDecorator(`promotion_percentage${i+1}`, {
                    rules: [
                      { required: true, message: 'Please enter the percentage off' }
                    ],
                    setFieldsValue: e.percentage,
                    initialValue: e.percentage
                  })(
                    <Input
                      className='width-100'
                      name='percentage'
                      onChange={(e) => this.handlePromotion(e, 'percentage', i)}
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

let PromotionsTab = Form.create()(Promotions);
export { PromotionsTab };