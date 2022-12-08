import React, { Component } from 'react';
import { DeleteTwoTone } from '@ant-design/icons';
import { Collapse, Row, Col, InputNumber, Button, Card } from 'antd';
import firebase from 'firebase/app';
import 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';
import { imageURL } from '../../../Common/createImageURL';

import './images.scss';

const { Panel } = Collapse;

class Images extends Component {
  handleUpload = (name, index) => {
    const { handleVariationChange } = this.props;
    handleVariationChange(name, 'image', 'images', index);
  }

  onUploadStart = () => {
    this.props.startLoading();
  }

  onUploadSuccess = (filename, i) => {
    this.props.stopLoading();
    this.handleUpload(filename, i);
  }

  handleAdd = e => {
    e.stopPropagation();
    const { addNewItem } = this.props;
    const data = {
      image: '',
      sort: 0
    }
    addNewItem(data, 'images');
  }

  render() {
    const { variation, handleVariationChange } = this.props;

    return (
      <Collapse>
        <Panel header="Images" key='images' extra={<Button onClick={this.handleAdd}>Add Image</Button>}>
          <Row className='images px-10' gutter={16}>
            { variation.images && variation.images.map((e, i) => {
              let src = '';
              if(e && e.image) {
                src = e.image.indexOf('http') > -1 ? e.image : imageURL(e.image);
              } else {
                src = e ? e.image : '';
              }

              return (
                <Col key={i} xs={24} sm={12} md={8}>
                  <Card className='item my-10' hoverable title={variation.sku}>
                    { src && 
                      <DeleteTwoTone
                        className='remove-btn'
                        twoToneColor='#eb2f96'
                        onClick={() => handleVariationChange('', 'image', 'images', i)} />
                    }
                    { src ?
                      <div className='center'>
                        <img className='p-10' src={src} alt='Product Variation' />
                        <div className='position my-15'>
                          <label className='left'>Position</label>
                          <InputNumber
                            className='width-100'
                            value={e.sort}
                            onChange={(e) => handleVariationChange(e, 'sort', 'images', i)}
                          />
                        </div>
                      </div>
                      :
                      <FileUploader
                        className='width-100'
                        accept='image/*'
                        name='image'
                        storageRef={firebase.storage().ref('productImages')}
                        onUploadStart={this.onUploadStart}
                        onUploadSuccess={e => this.onUploadSuccess(e, i)}
                      />
                    }
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Panel>
      </Collapse>
    );
  }
}

export { Images };
