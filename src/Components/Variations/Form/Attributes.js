import React, { Component } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Collapse, Row, Col, Input, Select, Button, Divider, Spin } from 'antd';
import { IMModal } from '../../../Common/Modal';
import { AddItem } from './AddAttribute';

const { Panel } = Collapse;
const { Option } = Select;

class Attributes extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      current: null
    }
  }

  handleAttribute = (e, i) => {
    const { handleStateChange } = this.props;
    let productAttributes = [...this.props.productAttributes];

    productAttributes[i].value = e;
    handleStateChange(productAttributes, 'productAttributes');
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

  handleAdd = e => {
    e.stopPropagation();
    const { addNewItem } = this.props;
    const data = {
      value: '',
      attributeID: null,
      attribute: { attributeID: null, attributeName: '', type: 'Text', category: null }
    }
    addNewItem(data, 'productAttributes');
  }

  render() {
    const { dropdown, variation, attributes, handleVariationChange, changeAttributeKey, selectLoading } = this.props;
    const { open } = this.state;

    return (
      <Collapse className='my-10'>
        <Panel header="Attributes" key='attributes' extra={<Button onClick={this.handleAdd}>Add Attribute</Button>}>
          <Row gutter={16}>
            { variation.productAttributes &&
              variation.productAttributes.map((a, i) => {
                const { attribute } = a;
                return (
                  attribute && (
                    <section key={`attribute-${i}`} className='d-flex-row'>
                      <Col className='my-10' xs={24} sm={12}>
                        <label>Attribute Name</label>
                        <Select
                          className='width-100'
                          showSearch
                          value={attribute.attributeName}
                          onChange={e => changeAttributeKey(e, i, attributes)}
                        >
                          { attributes.map((opt, idx) => {
                            return (
                              <Option key={`${opt.productAttributeID}-${idx}`} value={opt.attribute.attributeName}>
                                {opt.attribute.attributeName}
                              </Option>
                            )
                          })}
                        </Select>
                      </Col>
              
                      { attribute.type === 'Text' ?
                        <Col key={a.attributeID} className='my-10' xs={24} sm={12}>
                          <label>Attribute Value</label>
                          <Input
                            name={attribute.attributeName}
                            value={a.value}
                            onChange={(e) => handleVariationChange(e.target.value, 'value', 'productAttributes', i)}
                          />
                        </Col> :
                        <Col key={a.attributeID} className='my-10' xs={24} sm={12}>
                          <label>Attribute Value</label>
                          <Select
                            showSearch
                            className='width-100'
                            name={attribute.attributeName}
                            value={a.value}
                            notFoundContent={selectLoading ? <Spin size='small' /> : null}
                            onFocus={() => this.handleFocus(a.attributeID)}
                            onChange={(e) => handleVariationChange(e, 'value', 'productAttributes', i)}
                            dropdownRender={this.dropdownRender}
                          >
                            { !selectLoading && dropdown.map((d, i) =>
                              <Option key={`${d}-${i}`} value={d}>{d}</Option>
                            )}
                          </Select>
                        </Col> 
                      }
                    </section>
                  )
                )
              })
            }
          </Row>
          { open && <IMModal
            open={open}
            handleModal={this.handleModal}
            handleSave={this.handleSave}
            Component={AddItem}
            title='Add Item to Dropdown'
          />}
        </Panel>
      </Collapse>
    );
  }
}

export { Attributes };
