import React, { Component } from 'react';
import { CloseOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Card, Row, Col } from 'antd';
import firebase from 'firebase/app';
import 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';
import { documentURL } from '../../../../Common/createDocumentURL';

import './index.scss';

class CatalogsTab extends Component {

  handleChange = e => {
    const { handleStateChange } = this.props;
    let productDocuments = [...this.props.productDocuments];
    const data = {
      document: e,
      documentType: 'CAT'
    };

    if(productDocuments.length) {
      productDocuments[0].document = e;
    } else {
      productDocuments.push(data);
    }

    handleStateChange(productDocuments, 'productDocuments');
  }

  handleRemove = () => {
    const { handleStateChange } = this.props;
    let productDocuments = [...this.props.productDocuments];

    productDocuments[0].document = '';
    handleStateChange(productDocuments, 'productDocuments');
  }

  onUploadStart = () => {
    this.props.startLoading();
  }

  onUploadSuccess = filename => {
    this.props.stopLoading();
    this.handleChange(filename);
  }

  render() {
    const { productDocuments } = this.props;
    let src = '';
    src = productDocuments.length && productDocuments[0].document ?
      documentURL(productDocuments[0].document, productDocuments[0].documentType) :
      '';

    return (
      <Card hoverable className='my-10 parent-catalog'>
        <Row className='my-10' gutter={16}>
          { src ?
            <Col xs={12}>
              <div className='d-flex-row align-center image-container'>
                <span className='d-flex-row align-center'>
                  <FilePdfOutlined className='icon' />
                  <a className='mx-10' href={src} target='_blank' rel='noopener noreferrer'>
                    {productDocuments[0].document}
                  </a>
                </span>
                <CloseOutlined className='close-btn h-pointer' onClick={this.handleRemove} />
              </div>
            </Col> :
            <Col xs={12}>
              <label>Document</label>
              <FileUploader
                className='width-100'
                accept='.pdf'
                name='document'
                storageRef={firebase.storage().ref('documents')}
                onUploadStart={this.onUploadStart}
                onUploadSuccess={this.onUploadSuccess}
              />
          </Col>
          }
        </Row>
      </Card>
    );
  }
}

export { CatalogsTab };
