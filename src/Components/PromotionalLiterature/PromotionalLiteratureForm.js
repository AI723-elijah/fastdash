import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button, Alert } from 'antd';
import firebase from 'firebase/app';
import 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';

const { Item } = Form;

let LiteratureForm = props => {
  const { handleSave, form, imageError, documentError, formType, isUploading, form: { getFieldDecorator }, handleUploadStart, handleUploadSuccess, rep } = props;

  return (
    <>
      {isUploading && (<Alert message="File is Uploading...." type="info" />)}
      { imageError && (<Alert message="At-least one image is required!" type="error" />)}
      { documentError && (<Alert message="At-least one document is required!" type="error" />)}


      <Form id='imForm' onSubmit={(e) => handleSave(e, form)}>
        <Item className='py-5' style={{ marginTop: '10px' }}>
          {getFieldDecorator('literatureName', {
            rules: [{
              required: true, message: 'Please Enter Literature Name!',
            }],
            initialValue: rep.literatureName
          })(
            <Input
              placeholder='Literature Name'
              size='large'
            />
          )}
        </Item>

        <label>Image:</label>
        {rep.literatureImage}
        <FileUploader
          className='width-100'
          accept='image/*'
          name='image'
          storageRef={firebase.storage().ref('literature')}
          onUploadStart={handleUploadStart}
          onUploadSuccess={handleUploadSuccess}
        />
        <label  style={{ marginTop: '20px' }}>Document:{rep.literatureDocumentLink}</label>
        <FileUploader
          className='width-100'
          accept='application/pdf'
          name='document'
          storageRef={firebase.storage().ref('literature')}
          onUploadStart={handleUploadStart}
          onUploadSuccess={handleUploadSuccess}
        />

        <div style={{ borderTop: '1px solid #ccc', marginTop: '20px', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="primary" htmlType="submit" disabled={isUploading}>
            {formType || 'Add'}
          </Button>
        </div>
      </Form>
    </>
  );
}

LiteratureForm = Form.create()(LiteratureForm)
export { LiteratureForm };
