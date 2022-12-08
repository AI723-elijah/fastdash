import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import firebase from 'firebase/app';
import 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';

let SliderForm = ({ handleSave, form, handleUploadStart, handleUploadSuccess }) => {
  return (
    <Form id='imForm' onSubmit={(e) => handleSave(e, form)}>
      <label>Upload Banner</label>
      <FileUploader
        className='width-100 my-10'
        accept='image/*'
        name='image'
        storageRef={firebase.storage().ref('sliderImages')}
        onUploadStart={handleUploadStart}
        onUploadSuccess={handleUploadSuccess}
      />
    </Form>
  );
}

SliderForm = Form.create()(SliderForm)
export { SliderForm };
