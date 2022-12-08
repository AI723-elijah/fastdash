import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from 'antd';

const { Item } = Form;

let SupplierForm = ({ handleSave, form, form: { getFieldDecorator } }) => {
  return (
    <Form id='imForm' onSubmit={(e) => handleSave(e, form)}>
      <Item className='py-5'>
        { getFieldDecorator('supplierName', {
          rules: [{
            required: true, message: 'Please Enter Supplier Name!',
          }]
        })(
          <Input
            placeholder='Supplier Name'
            size='large'
          />
        )}
      </Item>
    </Form>
  );
}

SupplierForm = Form.create()(SupplierForm)
export { SupplierForm };
