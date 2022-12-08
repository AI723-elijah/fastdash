import React, { Component } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Row, Col, Card, Spin } from 'antd';
import { sliderURL } from '../../Common/createImageURL';

class List extends Component {

  render() {
    const { sliders, loading, handleModal, handleDelete } = this.props;

    return (
      <Spin spinning={loading}>
        <Row className='images px-10' gutter={16}>
          {sliders.map(e => {
            let src = sliderURL(e.image);
            return (
              <Col key={e.bannerID} xs={24} sm={12} md={8}>
                <Card className='item my-10' hoverable
                  actions={[
                    <EditOutlined key="edit" onClick={() => handleModal(e.sliderID)} />,
                    <DeleteOutlined key="delete" onClick={() => handleDelete(e.sliderID)} />,
                  ]}>
                    <div className='center'>
                    <img className='p-10' src={src} alt='Banner' />
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Spin>
    );
  }
}

export { List };
