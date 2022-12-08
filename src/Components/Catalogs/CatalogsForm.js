import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from 'antd';
import firebase from 'firebase/app';
import 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';

const { Item } = Form;
let CatalogForm = ({ handleSave, form, form: { getFieldDecorator }, handleUploadStart, handleUploadSuccess, rep }) => {
  return (
    <Form id='imForm' onSubmit={(e) => handleSave(e, form)}>
      <Item className='py-5'>
        { getFieldDecorator('catalogName', {
          rules: [{
            required: true, message: 'Please Enter Catalog Name!',
          }],
          initialValue: rep.catalogName
        })(
          <Input
            placeholder='Catalog Name'
            size='large'
          />
        )}
      </Item>
      <FileUploader
        className='width-100'
        accept='image/*'
        name='image'
        storageRef={firebase.storage().ref('catalogs')}
        onUploadStart={handleUploadStart}
        onUploadSuccess={handleUploadSuccess}
      />
      <FileUploader
        className='width-100'
        accept='application/pdf'
        name='document'
        storageRef={firebase.storage().ref('catalogs')}
        onUploadStart={handleUploadStart}
        onUploadSuccess={handleUploadSuccess}
      />
    </Form>
  );
}

CatalogForm = Form.create()(CatalogForm)
export { CatalogForm };
