import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from 'antd';
import ReactQuill from 'react-quill';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'react-quill/dist/quill.snow.css';
import './Styles/List.scss';

const { Item } = Form;

let ServicesForm = props => {
  const { handleSave, desc, form, form: { getFieldDecorator }, handleDesc, handleUploadStart, handleUploadSuccess, rep } = props;

  return (
    <Form id='imForm' onSubmit={(e) => handleSave(e, form)}>
      <Item className='py-2'>
        { getFieldDecorator('title', {
          rules: [{
            required: true, message: 'Please Enter Title!',
          }],
          initialValue: rep.title
        })(
          <Input
            placeholder='Service Title'
            size='large'
          />
        )}
      </Item>
      <Item className='py-2'>
        { getFieldDecorator('link', {
          rules: [{
            required: false
          }],
          initialValue: rep.link
        })(
          <Input
            placeholder='Read More Link'
            size='large'
          />
        )}
      </Item>
      <Item className='py-2'>
        { getFieldDecorator('sort', {
          rules: [{
            required: true, message: 'Please Enter Sort Value!',
          }],
          initialValue: rep.sort
        })(
          <Input
            placeholder='Sort'
            size='large'
          />
        )}
      </Item>
      <div className='py-5'>
        <ReactQuill
          value={desc}
          placeholder="Service Description"
          onChange={handleDesc}
        />
      </div>
      <FileUploader
        className='width-100'
        accept='image/*'
        name='image'
        storageRef={firebase.storage().ref('serviceImages')}
        onUploadStart={handleUploadStart}
        onUploadSuccess={handleUploadSuccess}
      />
    </Form>
  );
}

ServicesForm = Form.create()(ServicesForm)
export { ServicesForm };
