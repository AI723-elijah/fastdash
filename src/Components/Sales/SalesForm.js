import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Row, Col } from 'antd';

const { Item } = Form;
const { TextArea } = Input;

let SalesForm = ({ handleSave, form, form: { getFieldDecorator }, rep }) => {
  return (
    <Form id='imForm' onSubmit={(e) => handleSave(e, form)}>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <label>City</label>
          <Item className='py-5'>
            { getFieldDecorator('city', {
              rules: [{
                required: true, message: 'Please Enter City Name!',
              }],
              initialValue: rep.city
            })(
              <Input
                placeholder='City'
                size='large'
              />
            )}
          </Item>
        </Col>
        <Col xs={24} sm={12}>
          <label>State</label>
          <Item className='py-5'>
            { getFieldDecorator('state', {
              rules: [{
                required: true, message: 'Please Enter State Name!',
              }],
              initialValue: rep.state
            })(
              <Input
                placeholder='State'
                size='large'
              />
            )}
          </Item>
        </Col>
        <Col xs={24} sm={12}>
          <label>Zip Code</label>
          <Item className='py-5'>
            { getFieldDecorator('zipCode', {
              rules: [{
                required: true, message: 'Please Enter Zip Code!',
              }],
              initialValue: rep.zipCode
            })(
              <Input
                placeholder='Zip Code'
                size='large'
              />
            )}
          </Item>
        </Col>
        <Col xs={24} sm={12}>
          <label>State Code</label>
          <Item className='py-5'>
            { getFieldDecorator('stateCode', {
              rules: [{
                required: true, message: 'Please Enter State Code!',
              }],
              initialValue: rep.stateCode
            })(
              <Input
                placeholder='State Code'
                size='large'
              />
            )}
          </Item>
        </Col>
        <Col xs={24} sm={12}>
          <label>Email</label>
          <Item className='py-5'>
            { getFieldDecorator('email', {
              rules: [{
                required: true, message: 'Please Enter Email!',
              }],
              initialValue: rep.email
            })(
              <Input
                placeholder='Email'
                size='large'
              />
            )}
          </Item>
        </Col>
        <Col xs={24} sm={12}>
          <label>Company Name</label>
          <Item className='py-5'>
            { getFieldDecorator('companyName', {
              rules: [{
                required: true, message: 'Please Enter Company Name!',
              }],
              initialValue: rep.companyName
            })(
              <Input
                placeholder='Company Name'
                size='large'
              />
            )}
          </Item>
        </Col>
        <Col xs={24} sm={12}>
          <label>Rep Name</label>
          <Item className='py-5'>
            { getFieldDecorator('repName', {
              rules: [{
                required: false, message: 'Please Enter Name!',
              }],
              initialValue: rep.repName
            })(
              <Input
                placeholder='Rep Name'
                size='large'
              />
            )}
          </Item>
        </Col>
        <Col xs={24} sm={12}>
          <label>Phone</label>
          <Item className='py-5'>
            { getFieldDecorator('phone', {
              rules: [{
                required: true, message: 'Please Enter Phone Number!',
              }],
              initialValue: rep.phone
            })(
              <Input
                placeholder='Phone Number'
                size='large'
              />
            )}
          </Item>
        </Col>
        <Col xs={24}>
          <label>Address</label>
          <Item className='py-5'>
            { getFieldDecorator('address', {
              rules: [{
                required: true, message: 'Please Enter Address!',
              }],
              initialValue: rep.address
            })(
              <TextArea
                placeholder='Address'
                rows={2}
              />
            )}
          </Item>
        </Col>
        <Col xs={24}>
          <label>Territory</label>
          <Item className='py-5'>
            { getFieldDecorator('territory', {
              rules: [{
                required: true, message: 'Please Enter Territory!',
              }],
              initialValue: rep.territory
            })(
              <TextArea
                placeholder='Territory'
                size='large'
                rows={3}
              />
            )}
          </Item>
        </Col>
      </Row>
    </Form>
  );
}

SalesForm = Form.create()(SalesForm)
export { SalesForm };
