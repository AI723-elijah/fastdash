import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from 'antd';

const { Item } = Form;

let ContactsForm = props => {
  const { handleSave, form, form: { getFieldDecorator }, rep } = props;

  return (
    <Form id='imForm' onSubmit={(e) => handleSave(e, form)}>
      <Item className='py-5'>
        { getFieldDecorator('department', {
          rules: [{
            required: true, message: 'Please Enter Department Name!',
          }],
          initialValue: rep.department
        })(
          <Input
            placeholder='Department'
            size='large'
          />
        )}
      </Item>
      <Item>
        { getFieldDecorator('email', {
          rules: [{
            type: 'email', message: 'Invalid Email Address!',
          }, {
            required: true, message: 'Please Enter Department Email!',
          }],
          initialValue: rep.email
        })(
          <Input
            placeholder='Email'
            size='large'
          />
        )}
      </Item>
    </Form>
  );
}

ContactsForm = Form.create()(ContactsForm)
export { ContactsForm };
