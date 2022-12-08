import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from 'antd';
import 'firebase/storage';

const { Item } = Form;

let VideoForm = props => {
  const { handleSave, form, form: { getFieldDecorator }, rep } = props;

  return (
    <Form id='imForm' onSubmit={(e) => handleSave(e, form)}>
      <Item className='py-5'>
        <label>Title</label>
        { getFieldDecorator('title', {
          rules: [{
            required: true, message: 'Please Enter Title!',
          }],
          initialValue: rep.title
        })(
          <Input
            placeholder='Title'
            size='large'
          />
        )}
      </Item>
      <Item className='py-5'>
        <label>Video URL</label>
        { getFieldDecorator('videoURL', {
          rules: [{
            required: true, message: 'Please Enter Video URL!',
          }],
          initialValue: rep.videoURL
        })(
          <Input
            placeholder='Video URL'
            size='large'
          />
        )}
      </Item>
    </Form>
  );
}

VideoForm = Form.create()(VideoForm)
export { VideoForm };
