
import React, { useState } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { FilePdfOutlined } from '@ant-design/icons';
import { Input, Select, Row, Col, Button, Alert } from 'antd';
import firebase from 'firebase/app';
import 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';
import { pdfDocURL, pdfImageURL } from '../../Common/createPdfURL';

const { Item } = Form;
const { Option } = Select;

let PdfForm = ({ 
  handleSave, form, form: { getFieldDecorator }, 
  pdfDetail , handleUploadPDFSuccess, handleUploadImageSuccess, loading,
  img, pdf
}) => {
  const [pdfLoader, setPdfLoader] = useState(false);
  const [imgLoader, setImageLoader] = useState(false);
  return (
    <Form id='imForm' onSubmit={(e) => handleSave(e, form)}>
      <Row gutter={16}>
      {pdfLoader && (<Alert message="Please wait. File is Uploading..." type="warning" />)}
      {imgLoader && (<Alert message="Please wait. Image is Uploading..." type="warning" />)}
      <Col xs={24} sm={24}>
          <label>PDF</label>
          {(pdf || pdfDetail.pdf) &&
            <span className='d-flex-row align-center my-10'>
                <FilePdfOutlined className='icon' />
                <a 
                  className='mx-10'
                  // onClick={() => handlePdf(record)}
                  href={pdf ? pdfDocURL(pdf) : pdfDocURL(pdfDetail.pdf)} 
                  target='_blank' 
                  rel='noopener noreferrer'
                >
                  {pdf ? pdf : pdfDetail.pdf}
              </a>
            </span>
          }
          <FileUploader
          // disabled={pdfDetail.pdf ? true : false}
              className='btn btn-primary width-100 my-10'
              accept='.pdf'
              name='pdf'
              onUploadStart={() => setPdfLoader(true)}
              onUploadSuccess={(file) => {
                handleUploadPDFSuccess(file)
                setPdfLoader(false)
              }}
              storageRef={firebase.storage().ref(`pdfs`)}
            />
        </Col>
        <Col xs={24} sm={12}>
          <label>Title</label>
          <Item className='py-5'>
            { getFieldDecorator('title', {
              rules: [{
                required: true, message: 'Please Enter PDF Title',
              }],
              initialValue: pdfDetail && pdfDetail.title 
            })(
              <Input
                placeholder='Title'
                size='large'
              />
            )}
          </Item>
        </Col>
        <Col xs={24} sm={12}>
          <label>Password Protected</label>
          <Item className='py-5'>
            { getFieldDecorator('passwordProtected', {
              rules: [{
                required: true, message: 'Password Protected',
              }],
              initialValue: pdfDetail && pdfDetail.passwordProtected 
            })(
              <Select>
                <Option value='yes'>YES</Option>
                <Option value='no'>NO</Option>
                </Select>
            )}
          </Item>
        </Col>
        {/* <Col xs={24} sm={8}>
          <label>Password</label>
          <Item className='py-5'>
            { getFieldDecorator('password', {
              rules: [{
                required: form && form.getFieldValue('passwordProtected') === 'yes' ? true : false, message: 'Password is required',
              }],
              initialValue: pdfDetail && pdfDetail.password 
            })(
              <Input
                placeholder='Password'
                size='large'
                type='password'
              />
            )}
          </Item>
        </Col> */}
        <Col xs={24} sm={24}>
          <label>Image</label>
          <br />
          {(img || pdfDetail.image) &&
            <img 
              src={pdfImageURL(img ? img : pdfDetail.image)}
              alt={pdfDetail.title}
              className='my-10'
              style={{height: '120px'}}
              />
          }
          <FileUploader
              className='btn btn-primary width-100 my-10'
              required={(img || pdfDetail.image) ? false : true}
              accept='image/*'
              name='image'
              onUploadStart={() => setImageLoader(true)}
              onUploadSuccess={(file) => {
                handleUploadImageSuccess(file)
                setImageLoader(false)
              }}
              storageRef={firebase.storage().ref(`pdfImages`)}
            />
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
            <div style={{ borderTop: '1px solid #ccc', marginTop: '20px', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="primary" htmlType="submit" disabled={loading || pdfLoader}>
                    Submit
                </Button>
            </div>
        </Col>
      </Row>
    </Form>
  );
}

PdfForm = Form.create()(PdfForm)
export { PdfForm };
