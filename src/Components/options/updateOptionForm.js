import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Col, Row } from 'antd';
import firebase from 'firebase/app';
import 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';

const { Item } = Form;
const { TextArea } = Input;


let UpdateOptionForm = props => {
  const { selectedOption,
    src,
    handleSave,
    form,
    form: { getFieldDecorator },
    handleUploadStart,
    handleUploadSuccess,
    onCancelDoc,
    onUpdateDoc,loading

  } = props;
  const docs = selectedOption.documents.map(doc => doc.type);
  return (
    <Form id='imForm' onSubmit={(e) => handleSave(e, form)}>
      <Item className='py-5'>
        {getFieldDecorator('name', {
          initialValue: selectedOption.name,
          rules: [{
            required: true, message: 'Please Enter Option Name!',
          }]
        }
        )(
          <Input
            placeholder='Option Name'
            size='large'
          />
        )}
      </Item>
      <Item className='py-5'>
        {getFieldDecorator('description', {
          initialValue: selectedOption.description,
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

      {src && selectedOption ?
        <>
          <div style={{ display: 'flex' }}>
            <img style={{ height: '100px', width: '180px' }} src={src}  alt='i'/>
            <div className="change-image" style={{ display: 'flex' }} >
              <div></div>
              <div>
                <div class="upload-btn-wrapper">
                  <button class="btn">Change Image</button>
                  <FileUploader
                    className='width-100 chose-file'
                    accept='image/*'
                    name='image'
                    storageRef={firebase.storage().ref('options')}
                    onUploadStart={handleUploadStart}
                    onUploadSuccess={handleUploadSuccess}
                  />
                </div></div>
            </div>
          </div>
        </> :
        <FileUploader
          className='width-100 chose-file'
          accept='image/*'
          name='image'
          storageRef={firebase.storage().ref('options')}
          onUploadStart={handleUploadStart}
          onUploadSuccess={handleUploadSuccess}
        />
      }

      <Row className='options-doc-row' gutter={16} loading={loading}>


        <Col xs={24} sm={12} className='col-mb'>
          <span className='text-bold'>SPC</span>
          {docs.includes('SPC') ?
            <>
              {selectedOption.documents.map(doc => {
                return <>
                  {doc.type === 'SPC' ?
                    <div className="update-doc-box">
                      <CloseOutlined onClick={() => onCancelDoc(doc)} />
                      {doc.documentName}</div> : ''}
                </>;
              })}
            </> :
            <div className="update-doc-box">
              <FileUploader
                className='width-100'
                accept='.pdf, .pdfx'
                name='SPC'
                storageRef={firebase.storage().ref('options/documents')}
                onUploadStart={handleUploadStart}
                onUploadSuccess={(e) => onUpdateDoc(e, 'SPC')}
              />
            </div>

          }
        </Col>

        <Col xs={24} sm={12} className='col-mb'>
          <span className='text-bold'>CAT</span>
          {docs.includes('CAT') ?
            <>
              {selectedOption.documents.map(doc => {
                return <>
                  {doc.type === 'CAT' ?
                    <div className="update-doc-box">
                      <CloseOutlined onClick={() => onCancelDoc(doc)} />
                      {doc.documentName}</div> : ''}
                </>;
              })}
            </> :
            <div className="update-doc-box">
              <FileUploader
                className='width-100'
                accept='.pdf, .pdfx'
                name='CAT'
                storageRef={firebase.storage().ref('options/documents')}
                onUploadStart={handleUploadStart}
                onUploadSuccess={(e) => onUpdateDoc(e, 'CAT')}
              />
            </div>

          }
        </Col>

        <Col xs={24} sm={12} className='col-mb'>
          <span className='text-bold'>LM79</span>
          {docs.includes('LM79') ?
            <>
              {selectedOption.documents.map(doc => {
                return <>
                  {doc.type === 'LM79' ?
                    <div className="update-doc-box">
                      <CloseOutlined onClick={() => onCancelDoc(doc)} />
                      {doc.documentName}</div> : ''}
                </>;
              })}
            </> :
            <div className="update-doc-box">
              <FileUploader
                className='width-100'
                accept='.pdf, .pdfx'
                name='LM79'
                storageRef={firebase.storage().ref('options/documents')}
                onUploadStart={handleUploadStart}
                onUploadSuccess={(e) => onUpdateDoc(e, 'LM79')}
              />
            </div>
          }
        </Col>

        <Col xs={24} sm={12} className='col-mb'>
          <span className='text-bold'>IES</span>
          {docs.includes('IES') ?
            <>
              {selectedOption.documents.map(doc => {
                return <>
                  {doc.type === 'IES' ?
                    <div className="update-doc-box">
                      <CloseOutlined onClick={() => onCancelDoc(doc)} />
                      {doc.documentName}</div> : ''}
                </>;
              })}
            </> :
            <div className="update-doc-box">
              <FileUploader
                className='width-100'
                name='IES'
                storageRef={firebase.storage().ref('options/documents')}
                onUploadStart={handleUploadStart}
                onUploadSuccess={(e) => onUpdateDoc(e, 'IES')}
              />
            </div>
          }
        </Col>

        <Col xs={24} sm={12} className='col-mb'>
          <span className='text-bold'>MAN</span>
          {docs.includes('MAN') ?
            <>
              {selectedOption.documents.map(doc => {
                return <>
                  {doc.type === 'MAN' ?
                    <div className="update-doc-box" >
                      <CloseOutlined onClick={() => onCancelDoc(doc)} />
                      {doc.documentName}</div> : ''}
                </>;
              })}
            </> :
            <div className="update-doc-box" >
              <FileUploader
                className='width-100'
                name='MAN'
                accept='.pdf, .pdfx'
                storageRef={firebase.storage().ref('options/documents')}
                onUploadStart={handleUploadStart}
                onUploadSuccess={(e) => onUpdateDoc(e, 'MAN')}
              />
            </div>
          }
        </Col>
      </Row>
    </Form>
  );
}

UpdateOptionForm = Form.create()(UpdateOptionForm)
export { UpdateOptionForm }
