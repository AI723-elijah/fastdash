import React, { Component } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Card, Row, Col, Input, Select, Divider, Spin, Typography } from 'antd';
import { IMModal } from '../../../../Common/Modal';
import { AddItem } from './AddItems';

const { Option } = Select;
const { Title } = Typography;

class AttributesTab extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      current: null,
      dropdown: []
    }
  }

  componentDidUpdate(oldProps) {
    const { dropdown } = this.props;
    if (dropdown !== oldProps.dropdown) {
      this.setState({ dropdown });
    }
  }

  handleAttribute = (e, i) => {
    const { handleStateChange } = this.props;
    let productAttributes = [...this.props.productAttributes];
    productAttributes[i].value = e;
    handleStateChange(productAttributes, 'productAttributes');
  }

  handleFalshTool = (e, value) => {
    const { product, product: { productAttributes }, handleStateChange } = this.props;
    const index = productAttributes.findIndex(p => p.attributeID === e.attributeID);
    productAttributes[index].value = value;
    product.productAttributes = productAttributes;
    handleStateChange(product, 'product');

  }
  handleNewFlashTool = (value) => {
    if (value !== '') {
      const { product, product: { productAttributes }, handleStateChange } = this.props;
      const attribut = {
        attributeID: 140,
        sharedFlag: "0",
        value: value
      };
      productAttributes.push(attribut);
      product.productAttributes = productAttributes;
      handleStateChange(product, 'product');
    }
  }

  handleFocus = id => {
    const { getDropDownValues } = this.props;
    this.setState({ current: id });
    getDropDownValues(id);
  }

  handleModal = () => {
    this.setState({ open: !this.state.open });
  }

  handleSave = (e, form) => {
    e.preventDefault();
    form.validateFields((err, v) => {
      if (!err) {
        const { current } = this.state;
        const i = this.props.productAttributes.findIndex(p => p.attributeID === current);
        this.handleAttribute(v.value, i);
        this.handleModal();
      }
    });
  }

  dropdownRender = menu => {
    return <>
      {menu}
      <Divider className='my-5' />
      <div className='p-10 h-pointer width-100' onMouseDown={this.handleModal}>
        <PlusOutlined /> Add Item
      </div>
    </>;
  }

  render() {
    const { productAttributes, selectLoading, product } = this.props;
    const { dropdown, open } = this.state;
    const parentAttributes = productAttributes.filter(pA =>
      pA.attribute.category === 'parent' || pA.attribute.category === null
    );
    const checkFlashtool = product.productAttributes.filter(att => att.attributeID === 140)

    return (
      <>
        {
          process.env.REACT_APP_NAME === 'westgate' &&
          <>
            {product.productAttributes.length > 0 && product.productAttributes.map((att, i) => (
              att.attributeID === 140 ?
                <Card hoverable >
                  <Row gutter={16}>
                    <Col key={att.attributeID} className='my-10' xs={24} sm={12} md={8}>
                      <label>Flashtool</label>
                      <Select
                        className='width-100'
                        value={att.value}
                        onChange={(e) => this.handleFalshTool(att, e)}
                      >
                        <Option key="0" value="">None</Option>
                        <Option key="1" value="Outdoor">Outdoor</Option>
                        <Option key="2" value="Indoor">Indoor</Option>
                      </Select>
                    </Col>
                  </Row>
                </Card>
                :
                ""
            ))}
            {
              checkFlashtool.length === 0 &&
              <Card hoverable>
                <Row gutter={16}>
                  <Col className='my-10' xs={24} sm={12} md={8}>
                    <label>Flashtool</label>
                    <Select
                      className='width-100'
                      onChange={(e) => this.handleNewFlashTool(e)}
                      value=''
                    >
                      <Option key="0" value="">None</Option>
                      <Option key="1" value="Outdoor">Outdoor</Option>
                      <Option key="2" value="Indoor">Indoor</Option>
                    </Select>
                  </Col>
                </Row>
              </Card>
            }
          </>
        }
        {
          process.env.REACT_APP_NAME !== 'westgate' &&
          <Card hoverable>
            <Row gutter={16}>
              {parentAttributes.length > 0 ?
                parentAttributes.map((a, i) => {
                  const { attribute } = a;
                  return (
                    attribute.type === 'Text' ?
                      <Col key={a.attributeID} className='my-10' xs={24} sm={12} md={8}>
                        <label>{attribute.attributeName}</label>
                        <Input
                          name={attribute.attributeName}
                          value={a.value}
                          onChange={(e) => this.handleAttribute(e.target.value, i)}
                        />
                      </Col> :
                      <Col key={a.attributeID} className='my-10' xs={24} sm={12} md={8}>
                        <label>{attribute.attributeName}</label>
                        <Select
                          showSearch
                          className='width-100'
                          name={attribute.attributeName}
                          value={a.value}
                          notFoundContent={selectLoading ? <Spin size='small' /> : null}
                          onFocus={() => this.handleFocus(a.attributeID)}
                          onChange={(e) => this.handleAttribute(e, i)}
                          dropdownRender={this.dropdownRender}
                        >
                          {!selectLoading && dropdown.map((d, i) =>
                            <Option key={`${d}-${i}`} value={d}>{d}</Option>
                          )}
                        </Select>
                      </Col>
                  )
                }) :
                <Title level={4} className='center'>No Attributes Found</Title>
              }
            </Row>
            {open && <IMModal
              open={open}
              handleModal={this.handleModal}
              handleSave={this.handleSave}
              Component={AddItem}
              title='Add Item to Dropdown'
            />}
          </Card>
        }
      </>
    );
  }
}

export { AttributesTab };
