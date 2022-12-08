import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from 'antd';
import FileUploader from 'react-firebase-file-uploader';
import ReactQuill from 'react-quill';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'react-quill/dist/quill.snow.css';
import './Styles/List.scss';

const { Item } = Form;

let ItemForm = props => {
  const { handleSave, form, form: { getFieldDecorator }, handleUploadStart, handleUploadSuccess, rep, desc, handleDesc } = props;

  return (
    <Form id='imForm' onSubmit={(e) => handleSave(e, form)}>
      <Item className='py-2'>
        { getFieldDecorator('name', {
          rules: [{
            required: true, message: 'Please Enter Name!',
          }],
          initialValue: rep.name
        })(
          <Input
            placeholder='Item Name'
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
          placeholder="Description"
          onChange={handleDesc}
        />
      </div>
      <FileUploader
        className='width-100'
        accept='image/*'
        name='image'
        storageRef={firebase.storage().ref('brandStore')}
        onUploadStart={handleUploadStart}
        onUploadSuccess={handleUploadSuccess}
      />
      <div className='mt-3 preview-img'>
        {rep.image &&
          <img
            src={`https://firebasestorage.googleapis.com/v0/b/westgatedash-d1341.appspot.com/o/brandStore%2F${rep.image}?alt=media`}
            alt={rep.name}
          />
        }
      </div>
    </Form>
  );
}

ItemForm = Form.create()(ItemForm)
export { ItemForm };
