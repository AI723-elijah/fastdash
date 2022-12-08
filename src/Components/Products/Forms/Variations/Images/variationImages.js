import React, { Component } from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Button, Row, Col, message, Input } from 'antd';
import firebase from 'firebase/app';
import 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';
import { imageURL } from '../../../../../Common/createImageURL';

class Images extends Component {
  state = {
    imageSizeGreater: false, 
    sort: 0
  }
  addImage = () => {
    const { parentIndex, handleStateChange } = this.props;
    let variation = { ...this.props.productRelation };
    let variations = [...this.props.productRelations];
    const image = {
      channelID: 1,
      image: '',
      sort: variation.childProductDetails.length + 1
    };

    variation.childProductDetails.images.push(image);
    variations[parentIndex].childProductDetails = variation.childProductDetails;
    handleStateChange(variations, 'productRelations');
  }

  handleChange = (v, name, i) => {
    this.setState({sort: v})
    
    if (this.state.imageSizeGreater) {
      message.error("Image NOT Uploaded. Size Exceeds the Max Size Limit of 1MB. Please upload another Image", 1)
    } else {
      const { handleStateChange, parentIndex, removeProductVariationImage } = this.props;
      let productRelations = [...this.props.productRelations];
      productRelations[parentIndex].childProductDetails.images[i][name] = v;
      if (v === ''&& name === 'image') {
        let imageId = productRelations[parentIndex].childProductDetails.images[i].productImageID;
        if (imageId !== undefined || imageId !== null) {
          removeProductVariationImage(imageId);
          productRelations[parentIndex].childProductDetails.images.splice(i, 1);
          handleStateChange(productRelations, 'productRelations');
        }
      }
    }
  }

  onUploadStart = (e) => {
    this.props.startLoading();
  }

  onUploadSuccess = (filename, i) => {
    this.props.stopLoading();
    this.handleChange(filename, 'image', i);
  }

  truncateText = text => {
    if (text.length > 90) {
      return `${text.substring(0, 90)}...`;
    }

    return text;
  }

  render() {
    const { productRelation } = this.props;
    return (
      <Card
        title='Variation Images'
        type='inner'
        extra={
          <Button icon={<PlusOutlined />} type='primary' onClick={this.addImage}>Add Image</Button>
        }
      >
        <Row className='variation-row' gutter={16}>
          {productRelation.childProductDetails &&
            productRelation.childProductDetails.images.map((p, i) => {
              let src = '';
              if (p.image) {
                if (p.image.indexOf('http') > -1) {
                  src = p.image;
                } else {
                  src = imageURL(p.image);
                }
              }

              return (
                <Col key={`image-${i}`} xs={24} sm={8} className='mb-5'>
                  <br />
                  <div className='d-flex-row align-center image-container'>
                    {src ?
                      <span className='d-flex-row align-center'>
                        <img src={src} alt='Variation Img' />
                        <label className='mx-10'>{this.truncateText(p.image)}</label>
                      </span>
                      :
                      <>
                        <CloseOutlined
                          className='close-btn h-pointer'
                          onClick={() => this.handleChange('', 'image', i)} />
                        <FileUploader
                          accept='image/*'
                          name='image'
                          storageRef={firebase.storage().ref('productImages')}
                          onUploadStart={e => {
                            const { size } = e
                            if(size > 2000000){
                              this.setState({
                                imageSizeGreater: true
                              })
                            }else{
                              this.setState({
                                imageSizeGreater: false
                              })
                            }
                            this.onUploadStart(e)
                          }}
                          onUploadSuccess={(e) => this.onUploadSuccess(e, i)}
                        />
                      </>
                    }
                    {src &&
                      <CloseOutlined
                        className='close-btn h-pointer'
                        onClick={() => this.handleChange('', 'image', i)} />
                    }
                  </div>
                  <label>Sort</label>
                <Input
                  name='sort'
                  value={p.sort}
                  onChange={e => this.handleChange(e.currentTarget.value, 'sort', i)}
                />
                <br />
                </Col>
              );
            })}
        </Row>
      </Card>
    );
  }
}

export { Images };
