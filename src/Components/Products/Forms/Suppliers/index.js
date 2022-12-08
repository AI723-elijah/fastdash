import React, { Component } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Row, Col, Card, Input, DatePicker, Select, InputNumber } from 'antd';
import moment from 'moment';

const { Item } = Form;
const { TextArea } = Input;
const { Option } = Select;

class Suppliers extends Component {
  componentDidMount() {
    const { getSuppliers } = this.props;

    getSuppliers();
  }

  handleSupplier = (e, name, i) => {
    const { handleStateChange } = this.props;
    let productSuppliers = [...this.props.productSuppliers];

    productSuppliers[i][name] = e;

    handleStateChange(productSuppliers, 'productSuppliers');
  }

  handleDelete = i => {
    let productSuppliers = [...this.props.productSuppliers];

    productSuppliers.splice(i, 1);
    this.props.handleStateChange(productSuppliers, 'productSuppliers');
  }

  render() {
    const { suppliers, productSuppliers, handleAddToArray, form: { getFieldDecorator }, match: { params: { id } } } = this.props;
    const supplier = {
      supplierID: '',
      cost: '',
      sku: '',
      date: '',
      notes: ''
    };

    return <>
      <div className='mx-15 d-flex-row justify-end'>
        <Button onClick={() => handleAddToArray('productSuppliers', supplier)}>Add Supplier</Button>
      </div>
      {productSuppliers.map((e, i) => {
        return (
          <Row key={i} className='my-10' gutter={16}>
            <Card
              hoverable
              title={
                <div className='d-flex-row justify-between'>
                  Product Suppliers
                  { !id && <DeleteOutlined onClick={() => this.handleDelete(i)} />}
                </div>
              }
            >
              <Col sx={24} sm={12} md={5}>
                <label>Select Supplier</label>
                <Item>
                  { getFieldDecorator(`supplier${i+1}`, {
                    rules: [
                      { required: true, message: 'Please select a Supplier' }
                    ],
                    setFieldsValue: e.supplierID,
                    initialValue: e.supplierID
                  })(
                    <Select
                      className='width-100'
                      showSearch
                      onChange={e => this.handleSupplier(e, 'supplierID', i)}
                    >
                      {suppliers.map(c => {
                        return (
                          <Option key={c.supplierID} value={c.supplierID}>{c.supplierName}</Option>
                        )
                      })}
                    </Select>
                  )}
                </Item>
              </Col>
              <Col xs={24} sm={12} md={4}>
                <label>Cost</label>
                <Item>
                  { getFieldDecorator(`supplier_cost${i+1}`, {
                    rules: [
                      { required: true, message: 'Please enter Supplier Cost' }
                    ],
                    setFieldsValue: e.cost,
                    initialValue: e.cost
                  })(
                    <InputNumber
                      className='width-100'
                      onChange={(e) => this.handleSupplier(e, 'cost', i)}
                    />
                  )}
                </Item>
              </Col>
              <Col xs={24} sm={12} md={5}>
                <label>SKU</label>
                <Item>
                  { getFieldDecorator(`supplier_sku${i+1}`, {
                    rules: [
                      { required: true, message: 'Please enter SKU' }
                    ],
                    setFieldsValue: e.sku,
                    initialValue: e.sku
                  })(
                    <Input
                      className='width-100'
                      onChange={(e) => this.handleSupplier(e.target.value, 'sku', i)}
                    />
                  )}
                </Item>
              </Col>
              <Col xs={24} sm={12} md={5}>
                <label>Date</label>
                <Item>
                  { getFieldDecorator(`supplier_date${i+1}`, {
                    rules: [
                      { required: true, message: 'Please enter Date' }
                    ],
                    setFieldsValue: e.date ? moment(e.date) : moment(),
                    initialValue: e.date ? moment(e.date) : moment()
                  })(
                    <DatePicker
                      className='width-100'
                      onChange={(date) => this.handlePromotion(date, 'date', i)}
                    />
                  )}
                </Item>
              </Col>
              <Col xs={24} sm={24} md={5}>
                <label>Notes</label>
                <Item>
                  { getFieldDecorator(`supplier_notes${i+1}`, {
                    setFieldsValue: e.notes,
                    initialValue: e.notes
                  })(
                    <TextArea
                      className='width-100'
                      autosize
                      value={e.notes}
                      onChange={(e) => this.handlePromotion(e, 'notes', i)}
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

let SuppliersTab = Form.create()(Suppliers);
export { SuppliersTab };
