import React, { Component } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Button, Row, Col, Select, Input, Popconfirm } from 'antd';

const { Option } = Select;

class Attributes extends Component {
  addAttribute = () => {
    const { parentIndex, handleStateChange } = this.props;
    let variation = {...this.props.productRelation};
    let variations = [...this.props.productRelations];
    const data = {
      attribute: {
        attributeID: null,
        attributeName: '',
        category: 'child',
        type: 'text',
      },
      attributeID: null,
      sharedFlag: 0,
      value: ''
    };

    variation.childProductDetails.productAttributes.push(data);
    variations[parentIndex].childProductDetails = variation.childProductDetails;
    handleStateChange(variations, 'productRelations');
  }

  handleSelect = (v, i) => {
    const { handleStateChange, parentIndex, attributes } = this.props;
    let productRelations = [...this.props.productRelations];
    const attribute = attributes.find(a => a.attribute.attributeName === v);

    productRelations[parentIndex].childProductDetails.productAttributes.filter(f => f.attribute !== null)[i].attributeID = attribute.attributeID;
    productRelations[parentIndex].childProductDetails.productAttributes.filter(f => f.attribute !== null)[i].attribute.attributeID = attribute.attributeID;
    productRelations[parentIndex].childProductDetails.productAttributes.filter(f => f.attribute !== null)[i].attribute.attributeName = v;

    handleStateChange(productRelations, 'productRelations');
  }

  handleChange = (v, name, i) => {
    const { handleStateChange, parentIndex } = this.props;
    let productRelations = [...this.props.productRelations];

    productRelations[parentIndex].childProductDetails.productAttributes.filter(f => f.attribute !== null)[i][name] = v;
    handleStateChange(productRelations, 'productRelations');
  }

  handleDelete = (p, i) => {
    const { parentIndex, handleStateChange, deleteProductAttribute } = this.props;
    const productRelations = [...this.props.productRelations];

    productRelations[parentIndex].childProductDetails.productAttributes.splice(i, 1);

    if (p.productAttributeID) {
      deleteProductAttribute(p.productAttributeID)
    }
    handleStateChange(productRelations, 'productRelations');
  }

  render() {
    const { productRelation, attributes } = this.props;

    return (
      <Card
        title='Variation Attributes'
        type='inner'
        extra={
          <Button icon={<PlusOutlined />} type='primary' onClick={this.addAttribute}>Add Attribute</Button>
        }
      >
        <Row className='variation-row' gutter={16}>
          { productRelation.childProductDetails.productAttributes.map((p, i) => {
            return p.attribute !== null &&
            <section key={`attribute-${i}`} className='d-flex-row align-items-end'>
              <Col className='my-10' xs={24} sm={10}>
                <label>Attribute Name</label>
                <Select
                  className='width-100'
                  showSearch
                  value={p.attribute.attributeName}
                  onChange={e => this.handleSelect(e, i)}
                >
                  {attributes.filter(f => f.attribute !== null).map((a, idx) => {
                    const index = productRelation.childProductDetails.productAttributes.filter(f => f.attribute !== null).findIndex(f =>
                      f.attribute.attributeName === a.attribute.attributeName
                    );
                    return (
                      a.attribute.category === 'child' && index === -1 &&
                      <Option key={`${a.productAttributeID}-${idx}`} value={a.attribute.attributeName}>
                        {a.attribute.attributeName}
                      </Option>
                    )
                  })}
                </Select>
              </Col>
              <Col className='my-10' xs={24} sm={10}>
                <label>Attribute Value</label>
                <Input
                  value={p.value}
                  onChange={e => this.handleChange(e.target.value, 'value', i)}
                />
              </Col>
              <Col className='my-10' xs={24} sm={10}>
                <Popconfirm
                  title="It will permanently delete the attribute, are you sure you want to delete?"
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

export { Attributes };
