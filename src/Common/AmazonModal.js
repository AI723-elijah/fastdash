import React from 'react';
import { Modal, Button, Row, Col, Card } from 'antd';

const AmazonModal = ({ visible, amazonData, upc, onCancel, amazonClicked }) => {
  return (
    <Modal
      title={`${amazonData.length} Products Found on AMAZON with upc: ${upc}`}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key='close' onClick={onCancel}>
          Close
        </Button>
      ]}
    >
      <div style={{ background: '#ECECEC', padding: '5px' }}>
        <Row gutter={16}>
          {amazonData.map((prod, i) => {
            return (
              <Col span={8} key={i}>
                <Card
                  hoverable
                  bordered={false}
                  cover={<img alt={prod.name} src={prod.images[0].image} />}
                  onClick={() => amazonClicked(prod)}
                >
                  {prod.name}
                </Card>
              </Col>
            )
          })}
        </Row>
      </div>
    </Modal>
  );
}

export { AmazonModal };
