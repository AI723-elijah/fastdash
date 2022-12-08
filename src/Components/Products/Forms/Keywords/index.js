import React, { Component } from 'react';
import { Card, Row, Col, Input, Typography } from 'antd';

const { Title } = Typography;

class KeywordsTab extends Component {

  handleAttribute = (e, i) => {
    const { handleStateChange } = this.props;
    let productAttributes = [...this.props.productAttributes];

    productAttributes[i].value = e;
    handleStateChange(productAttributes, 'productAttributes');
  }

  render() {
    const { productAttributes } = this.props;
    return (
      <Card hoverable>
        <Row gutter={16}>
          { productAttributes.length > 0 ?
            productAttributes.map((a, i) => {
              const { attribute } = a;
              return (
                attribute.type === 'Text' &&
                attribute.attributeName.toLowerCase().indexOf('keyword') > -1 ?
                  <Col key={a.attributeID} className='my-10' xs={24} sm={12} md={8}>
                    <label>{attribute.attributeName}</label>
                    <Input
                      name={attribute.attributeName}
                      value={a.value}
                      onChange={(e) => this.handleAttribute(e.target.value, i)}
                    />
                  </Col> :
                  null
              )
            }) :
            <Title level={4} className='center'>No Keywords Found</Title>
          }
        </Row>
      </Card>
    );
  }
}

export { KeywordsTab };