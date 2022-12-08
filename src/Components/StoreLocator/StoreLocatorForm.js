import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, InputNumber } from 'antd';

import './Styles/List.scss';

const { Item } = Form;

let StoreLocatorForm = props => {
  const { form, form: { getFieldDecorator }, rep } = props;
  const validateForm = (e, form) => {
    e.preventDefault();
    props.handleSave(e,form);
  }

  return (
    <Form id='imForm' onSubmit={(e) => validateForm(e, form)}>
      <Item className='py-5'>
        {getFieldDecorator('name', {
          rules: [{
            required: true, message: 'Please Enter Store Name!',
          },
          ],
          initialValue: rep.name
        })(
          <Input
            placeholder='Store Name'
            size='large'
          />
        )}
      </Item>
      <Item className='py-5'>
        {getFieldDecorator('address', {
          rules: [{
            required: true, message: 'Please Enter Store Address!',
          }],
          initialValue: rep.address
        })(
          <Input
            placeholder='Store Address'
            size='large'
          />
        )}
      </Item>
      <Item className='py-5'>
        {getFieldDecorator('city', {
          rules: [{
            required: true, message: 'Please Enter Store City!',
          }],
          initialValue: rep.city
        })(
          <Input
            placeholder='Store City'
            size='large'
          />
        )}
      </Item>
      <Item className='py-5'>
        {getFieldDecorator('state', {
          rules: [{
            required: true, message: 'Please Enter Store State!',
          }],
          initialValue: rep.state
        })(
          <Input
            placeholder='Store State'
            size='large'
          />
        )}
      </Item>
      <Item className='py-5'>
        {getFieldDecorator('zip', {
          rules: [{
            required: true, message: 'Please Enter Store Zip!',
          }],
          initialValue: rep.zip
        })(
          <Input
            placeholder='Store Zip'
            size='large'
          />
        )}
      </Item>
      <Item className='py-5 w-100'>
        {getFieldDecorator('hours', {
          rules: [{
            required: true, message: 'Please Enter Store Hours!',
          }],
          initialValue: rep.hours
        })(
          <InputNumber
            min={0}
            placeholder='Store Hours'
            size='large'
          />
        )}
      </Item>
      <Item className='py-5'>
        {getFieldDecorator('categories', {
          rules: [{
            required: true, message: 'Please Enter Store Categories!',
          }],
          initialValue: rep.categories
        })(
          <Input
            placeholder='Store Categories'
            size='large'
          />
        )}
      </Item>
      <Item className='py-5'>
        {getFieldDecorator('additionalInfo', {
          rules: [{
            required: true, message: 'Please Enter Store Additional Info!',
          }],
          initialValue: rep.additionalInfo
        })(
          <Input
            placeholder='Additional Info'
            size='large'
          />
        )}
      </Item>
      <Item className='py-5'>
        {getFieldDecorator('long', {
          rules: [{
            required: true, message: 'Please Enter Store long Location!',
          }],
          initialValue: rep.long
        })(
          <Input
            min={0}
            placeholder='Long'
            size='large'
          />
        )}
      </Item>
      <Item className='py-5'>
        {getFieldDecorator('lat', {
          rules: [{
            required: true, message: 'Please Enter Store lat Location!',
          }],
          initialValue: rep.lat
        })(
          <Input
            placeholder='Lat'
            size='large'
          />
        )}
      </Item>
      <Item className='py-5'>
        {getFieldDecorator('phone', {
          rules: [{
            required: true, message: 'Please Enter Store Phone!',
          }],
          initialValue: rep.phone
        })(
          <Input
            placeholder='Phone'
            size='large'
          />
        )}
      </Item>
      <Item className='py-5'>
        {getFieldDecorator('fax', {
          rules: [{
            required: true, message: 'Please Enter Store Fax!',
          }],
          initialValue: rep.fax
        })(
          <Input
            placeholder='Fax'
            size='large'
          />
        )}
      </Item>
    </Form>
  );
}

StoreLocatorForm = Form.create()(StoreLocatorForm)
export { StoreLocatorForm };
