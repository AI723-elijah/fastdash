import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from 'antd';

const { Item } = Form;

let AddItem = ({ handleSave, form, form: { getFieldDecorator } }) => {
  return (
    <Form id='imForm' onSubmit={(e) => handleSave(e, form)}>
      <Item className='py-5'>
        { getFieldDecorator('value', {
          rules: [{
            required: true, message: 'Please Value!',
          }]
        })(
          <Input
            placeholder='Value'
            size='large'
          />
        )}
      </Item>
    </Form>
  );
}

AddItem = Form.create()(AddItem)
export { AddItem };
