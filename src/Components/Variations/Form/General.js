import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Row, Col, Input, InputNumber, Select, Collapse } from 'antd';

const { Item } = Form;
const { Option } = Select;
const { Panel } = Collapse;

const General = (props) => {
  const { variation, handleVariationChange, form: { getFieldDecorator } } = props;

  return (
    <Collapse defaultActiveKey={['general']}>
      <Panel header="General" key='general'>
        <Row gutter={16}>
          <Col sm={12} xs={12}>
            <label>UPC</label>
            <Item>
              { getFieldDecorator('upc', {
                rules: [{ required: true, message: 'Please enter UPC!' }],
                setFieldsValue: variation.upc,
                initialValue: variation.upc
              })(
                <Input
                  name='upc'
                  onChange={(e) => handleVariationChange(e.target.value, 'upc')}
                />
              )}
            </Item>
          </Col>
          <Col sm={12}>
            <label>SKU</label>
            <Item>
              { getFieldDecorator('sku', {
                rules: [
                  { required: true, message: 'Please enter SKU!' },
                  { min: 3, message: 'SKU should be atlease 3 characters long!' }
                ],
                setFieldsValue: variation.sku,
                initialValue: variation.sku
              })(
                <Input
                  name='sku'
                  onChange={(e) => handleVariationChange(e.target.value, 'sku')}
                />
              )}
            </Item>
          </Col>
          <Col sm={12}>
            <label>Product Name</label>
            <Item>
              { getFieldDecorator('name', {
                rules: [
                  { required: true, message: 'Please enter Product Name!' },
                  { min: 3, message: 'SKU should be atlease 3 characters long!' }
                ],
                setFieldsValue: variation.name,
                initialValue: variation.name
              })(
                <Input
                  name='name'
                  onChange={(e) => handleVariationChange(e.target.value, 'name')}
                />
              )}
            </Item>
          </Col>
          <Col sm={12}>
            <label>Description</label>
            <Item>
              { getFieldDecorator('description', {
                setFieldsValue: variation.description,
                initialValue: variation.description
              })(
                <Input
                  name='description'
                  onChange={(e) => handleVariationChange(e.target.value, 'description')}
                />
              )}
            </Item>
          </Col>
          <Col sm={12}>
            <label>Status</label>
            <Item>
              { getFieldDecorator('status', {
                setFieldsValue: variation.status,
                initialValue: variation.status
              })(
                <Select
                  className='width-100'
                  onChange={(e) => handleVariationChange(e, 'status')}
                >
                  <Option value='active'>Active</Option>
                  <Option value='inactive'>Inactive</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col sm={12}>
            <label>Price</label>
            <Item>
              { getFieldDecorator('price', {
                setFieldsValue: variation.price,
                initialValue: variation.price
              })(
                <InputNumber
                  className='width-100'
                  onChange={(e) => handleVariationChange(e, 'price')}
                />
              )}
            </Item>
          </Col>
          <Col sm={12}>
            <label>Quantity</label>
            <Item>
              { getFieldDecorator('quantity', {
                setFieldsValue: variation.quantity,
                initialValue: variation.quantity
              })(
                <InputNumber
                  className='width-100'
                  onChange={(e) => handleVariationChange(e, 'quantity')}
                />
              )}
            </Item>
          </Col>
        </Row>
      </Panel>
    </Collapse>
  );
}

let GeneralFields = Form.create()(General);
export { GeneralFields };
