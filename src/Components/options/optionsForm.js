import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Row, Col } from 'antd';
import firebase from 'firebase/app';
import 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';

const { Item } = Form;
const { TextArea } = Input;


let OptionsForm = props => {
  const { handleSave,
    form,
    form: { getFieldDecorator },
    handleUploadStart,
    handleUploadSuccess,
    handleSPCSuccess,
    handleCATSuccess,
    handleLM79Success,
    handleIESSuccess,
    handleMANSuccess
  } = props;



  return (
    <Form id='addForm' onSubmit={(e) => handleSave(e, form)}>
      <Item className='py-5'>
        {getFieldDecorator('name', {
          rules: [{
            required: true, message: 'Please Enter Option Name!',
          }]
        })(
          <Input
            placeholder='Option Name'
            size='large'
          />
        )}
      </Item>
      <Item className='py-5'>
        {getFieldDecorator('description', {
          rules: [{
            required: true, message: 'Please Enter Option Description!',
          }]
        })(
          <TextArea
            placeholder='Option Description'
            size='large'
          />
        )}
      </Item>
      <Row className='variation-row' gutter={16}>
        <Col xs={24} sm={24}>
          <p className='text-bold'>Image</p>

          <FileUploader
            className='width-100'
            accept='image/*'
            name='image'
            storageRef={firebase.storage().ref('options')}
            onUploadStart={handleUploadStart}
            onUploadSuccess={handleUploadSuccess}
          />
        </Col>
      </Row>

      <Row className='options-doc-row' gutter={16}>


        <Col xs={24} sm={12} className='col-mb'>
          <span className='text-bold'>SPC</span>

          <FileUploader
            className='width-100'
            accept='.pdf, .pdfx'
            name='SPC'
            storageRef={firebase.storage().ref('options/documents')}
            onUploadStart={handleUploadStart}
            onUploadSuccess={handleSPCSuccess}
          />
        </Col>
        <Col xs={24} sm={12} className='col-mb'>
          <span className='text-bold'>CAT</span>
          <FileUploader
            className='width-100'
            accept='.pdf, .pdfx'
            name='CAT'
            storageRef={firebase.storage().ref('options/documents')}
            onUploadStart={handleUploadStart}
            onUploadSuccess={handleCATSuccess}
          />
        </Col>
        <Col xs={24} sm={12} className='col-mb'>
          <span className='text-bold'>LM79</span>
          <FileUploader
            className='width-100'
            accept='.pdf, .pdfx'
            name='LM79'
            storageRef={firebase.storage().ref('options/documents')}
            onUploadStart={handleUploadStart}
            onUploadSuccess={handleLM79Success}
          />
        </Col>
        <Col xs={24} sm={12} className='col-mb'>
          <span className='text-bold'>IES</span>
          <FileUploader
            className='width-100'
            name='IES'
            storageRef={firebase.storage().ref('options/documents')}
            onUploadStart={handleUploadStart}
            onUploadSuccess={handleIESSuccess}
          />
        </Col>
        <Col xs={24} sm={12} className='col-mb'>
          <span className='text-bold'>MAN</span>

          <FileUploader
            className='width-100'
            accept='.pdf, .pdfx'
            name='MAN'
            storageRef={firebase.storage().ref('options/documents')}
            onUploadStart={handleUploadStart}
            onUploadSuccess={handleMANSuccess}
          />
        </Col>
      </Row>

    </Form>
  );
}

OptionsForm = Form.create()(OptionsForm)
export { OptionsForm };