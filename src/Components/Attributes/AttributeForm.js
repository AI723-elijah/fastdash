import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Select } from 'antd';

const { Item } = Form;
const { Option } = Select;

let AttributeForm = ({ handleSave, form, form: { getFieldDecorator } }) => {
  return (
    <Form id='imForm' onSubmit={(e) => handleSave(e, form)}>
      <Item className='py-5'>
        { getFieldDecorator('attributeName', {
          rules: [{
            required: true, message: 'Please Enter Attribute Name!',
          }]
        })(
          <Input
            placeholder='Attribute Name'
            size='large'
          />
        )}
      </Item>
      <Item className='py-5'>
        { getFieldDecorator('type', {
          initialValue: 'Text'
        })(
          <Select
            size='large'
            placeholder='Attribute Type'
            showSearch
          >
            <Option value='Text'>Text</Option>
            <Option value='Dropdown'>Dropdown</Option>
          </Select>
        )}
      </Item>
      <Item className='py-5'>
        { getFieldDecorator('websites', {
          initialValue: 'All'
        })(
          <Select
            size='large'
            placeholder='Websites'
            showSearch
          >
            <Option value='All'>All</Option>
            <Option value='My Westgate'>My Westgate</Option>
             <Option value='LED Lighting Closeout'>LED Lighting Closeout</Option>
          </Select>
        )}
      </Item>
      { process.env.REACT_APP_NAME === 'westgate' &&
        <Item className='py-5'>
          { getFieldDecorator('category', {
            initialValue: 'parent'
          })(
            <Select
              size='large'
              placeholder='Attribute Category'
              showSearch
            >
              <Option value='parent'>Parent</Option>
              <Option value='child'>Child</Option>
            </Select>
          )}
        </Item>
      }
    </Form>
  );
}

AttributeForm = Form.create()(AttributeForm)
export { AttributeForm };
