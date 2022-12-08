import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from 'antd';
import firebase from 'firebase/app';
import 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';

const { Item } = Form;

let IconForm = props => {
  const { handleSave, form, form: { getFieldDecorator }, handleUploadStart, handleUploadSuccess } = props;

  return (
    <Form id='imForm' onSubmit={(e) => handleSave(e, form)}>
      <Item className='py-5'>
        { getFieldDecorator('iconName', {
          rules: [{
            required: true, message: 'Please Enter Icon Name!',
          }]
        })(
          <Input
            placeholder='Icon Name'
            size='large'
          />
        )}
      </Item>
      <FileUploader
        className='width-100'
        accept='image/*'
        name='image'
        storageRef={firebase.storage().ref('icons')}
        onUploadStart={handleUploadStart}
        onUploadSuccess={handleUploadSuccess}
      />
    </Form>
  );
}

IconForm = Form.create()(IconForm)
export { IconForm };
