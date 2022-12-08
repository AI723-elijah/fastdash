import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from 'antd';

import './Styles/List.scss';

const { Item } = Form;

let OnlineRetailerForm = props => {
  const { form, form: { getFieldDecorator }, rep } = props;
  const validateForm = (e, form) => {
    e.preventDefault();
    props.handleSave(e, form);
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
        {getFieldDecorator('link', {
          rules: [{
            required: true, message: 'Please Enter Store Online Link!',
          }],
          initialValue: rep.link
        })(
          <Input
            placeholder='Link'
            size='large'
          />
        )}
      </Item>
    </Form>
  );
}

OnlineRetailerForm = Form.create()(OnlineRetailerForm)
export { OnlineRetailerForm };
