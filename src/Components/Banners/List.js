import React, { Component } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Row, Col, Card, Spin } from 'antd';
import { bannerURL } from '../../Common/createImageURL';

class List extends Component {

  render() {
    const { banners, loading, handleModal, handleDelete } = this.props;

    return (
      <Spin spinning={loading}>
        <Row className='images px-10' gutter={16}>
          {banners.map(e => {
            let src = bannerURL(e.image);
            return (
              <Col key={e.bannerID} xs={24} sm={12} md={8}>
                <Card className='item my-10' hoverable 
                actions={[
                    <EditOutlined key="edit" onClick={() => handleModal(e)} />,
                    <DeleteOutlined key="delete" onClick={() => handleDelete(e.bannerID)} />,
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
