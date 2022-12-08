import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from 'antd';
import firebase from 'firebase/app';
import 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';

const { Item } = Form

let BrandForm = props => {
  const { handleSave, form, form: { getFieldDecorator }, rep, handleUploadStart, handleUploadSuccess } = props;

  return (
    <Form id='imForm' onSubmit={(e) => handleSave(e, form)}>
      <Item className='py-2'>
        { getFieldDecorator('link', {
          rules: [{
            required: true, message: 'Please Enter Page Link!',
          }],
          initialValue: rep.link
        })(
          <Input
            placeholder='Link'
            size='large'
          />
        )}
      </Item>
      <FileUploader
        className='width-100'
        accept='image/*'
        name='image'
        storageRef={firebase.storage().ref('brands')}
        onUploadStart={handleUploadStart}
        onUploadSuccess={handleUploadSuccess}
      />
    </Form>
  );
}

BrandForm = Form.create()(BrandForm)
export { BrandForm };
