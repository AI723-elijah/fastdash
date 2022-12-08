import React, { Component } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Button, Row, Col, Input, Popconfirm } from 'antd';

class Videos extends Component {
    addVideo = () => {
    const { parentIndex, handleStateChange } = this.props;
    let variation = {...this.props.productRelation};
    let variations = [...this.props.productRelations];
    const data = {
        video: '',
        sort: 0,
        channelID: 0,
        thumbnail: ''
    };

    variation.childProductDetails.videos.push(data);
    variations[parentIndex].childProductDetails = variation.childProductDetails;
    handleStateChange(variations, 'productRelations');
  }

  handleChange = (v, name, i) => {
    const { handleStateChange, parentIndex } = this.props;
    let productRelations = [...this.props.productRelations];

    productRelations[parentIndex].childProductDetails.videos.filter(f => f)[i][name] = v;
    handleStateChange(productRelations, 'productRelations');
  }

  handleDelete = (p, i) => {
    const { parentIndex, handleStateChange, removeProductVariationVideo } = this.props;
    const productRelations = [...this.props.productRelations];

    productRelations[parentIndex].childProductDetails.videos.splice(i, 1);

    if (p && p.video) {
        removeProductVariationVideo(p.productVideoID)
    }
    handleStateChange(productRelations, 'productRelations');
  }

  render() {
    const { productRelation } = this.props;

    return (
      <Card
        title='Variation Video'
        type='inner'
        extra={
          <Button icon={<PlusOutlined />} type='primary' onClick={this.addVideo}>Add Video</Button>
        }
      >
        <Row className='variation-row' gutter={16}>
          { productRelation.childProductDetails.videos.map((p, i) => {
            return p.video !== null &&
            <section key={`attribute-${i}`} className='d-flex-row align-items-end'>
              {/* <Col className='my-10' xs={24} sm={6}>
                <label>Title</label>
                <Input
                  value={p.thumbnail}
                  onChange={e => this.handleChange(e.target.value, 'thumbnail', i)}
                />
              </Col> */}
              <Col className='my-10' xs={24} sm={12}>
                <label>Video URL</label>
                <Input
                  value={p.video}
                  onChange={e => this.handleChange(e.target.value, 'video', i)}
                />
              </Col>
              <Col className='my-10' xs={24} sm={4}>
                <label>Sort</label>
                <Input
                  type='number'
                  value={p.sort || i}
                  onChange={e => this.handleChange(e.target.value, 'sort', i)}
                />
              </Col>
              <Col className='my-10' xs={2}>
                <Popconfirm
                  title="It will permanently delete the video, are you sure you want to delete?"
                  onConfirm={() => this.handleDelete(p, i)}
                  okText='Yes'
                  cancelText='No'
                >
                  <Button icon={<DeleteOutlined />}>Delete</Button>
                </Popconfirm>
              </Col>
            </section>;
          })}
        </Row>
      </Card>
    );
  }
}

export { Videos };
