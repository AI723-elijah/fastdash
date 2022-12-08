import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Styles/List.scss';

const { Item } = Form;

let CareerForm = props => {
  const { handleSave, desc, form, form: { getFieldDecorator }, handleDesc, rep } = props;

  return (
    <Form id='imForm' onSubmit={(e) => handleSave(e, form)}>
      <Item className='py-5'>
        { getFieldDecorator('title', {
          rules: [{
            required: true, message: 'Please Enter Title!',
          }],
          initialValue: rep.title
        })(
          <Input
            placeholder='Career Title'
            size='large'
          />
        )}
      </Item>

      <Item className='py-5'>
        { getFieldDecorator('location', {
          rules: [{
            required: true, message: 'Please Enter location!',
          }],
          initialValue: rep.location
        })(
          <Input
            placeholder='Career location'
            size='large'
          />
        )}
      </Item>
      <div className='py-5'>
        <ReactQuill
          value={desc}
          placeholder="Career Description"
          onChange={handleDesc}
        />
      </div>
    </Form>
  );
}

CareerForm = Form.create()(CareerForm)
export { CareerForm };
