import React, { Component } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Row, Col, Card, InputNumber, Input, Select, Button } from 'antd';

const { Item } = Form;
const { Option } = Select;
const channel = {
  channelID: null,
  status: 'failed',
  channelProductID: null,
  channelPrice: null,
  unitOfMeasure: 1
};
class Channels extends Component {
  handleChannel = (e, name, i) => {
    const { handleStateChange } = this.props;
    let productChannels = [...this.props.productChannels];
    
    if (name === 'channelProductID') {
      productChannels[i][name] = e.target.value
    } else {
      productChannels[i][name] = e;
    }

    handleStateChange(productChannels, 'productChannels');
  }

  render() {
    const { productChannels, handleAddToArray, channels, form: { getFieldDecorator } } = this.props;

    return (
      <>
        <div className='mx-15 d-flex-row justify-end'>
          <Button onClick={() => handleAddToArray('productChannels', channel)}>Add Channel</Button>
        </div>
        {productChannels.map((e, i) => {
          return (
            <Row key={i} className='my-10' gutter={16}>
              <Card hoverable>
                <Col xs={24} sm={8}>
                  <label>Channel Name</label>
                  <Item>
                    { getFieldDecorator(`channel${i+1}`, {
                      rules: [
                        { required: true, message: 'Please select a Channel!' }
                      ],
                      setFieldsValue: e.channelID,
                      initialValue: e.channelID
                    })(
                      <Select
                        className='width-100'
                        onChange={(e) => this.handleChannel(e, 'channelID', i)}
                      >
                        {channels.map((c, i) => {
                          return (<Option key={i} value={c.channelID}>{c.channelName}</Option>)
                        })}
                      </Select>
                    )}
                  </Item>
                </Col>
                <Col xs={24} sm={8}>
                  <label>Status</label>
                  <Item>
                    { getFieldDecorator(`channel_status${i+1}`, {
                      rules: [
                        { required: true, message: 'Please select Channel Status!' }
                      ],
                      setFieldsValue: e.status,
                      initialValue: e.status
                    })(
                      <Select
                        className='width-100'
                        onChange={(e) => this.handleChannel(e, 'status', i)}
                      >
                        <Option value='success'>Published</Option>
                        <Option value='failed'>Not Published</Option>
                      </Select>
                    )}
                  </Item>
                </Col>
                <Col xs={24} sm={8}>
                  <label>Channel Product ID(ASIN)</label>
                  <Item>
                    { getFieldDecorator(`asin${i+1}`, {
                      rules: [
                        { required: true, message: 'Please enter Channel ASIN Number!' }
                      ],
                      setFieldsValue: e.channelProductID,
                      initialValue: e.channelProductID
                    })(
                      <Input
                        className='width-100'
                        onChange={(e) => this.handleChannel(e, 'channelProductID', i)}
                      />
                    )}
                  </Item>
                </Col>
                <Col xs={24} sm={8}>
                  <label>Channel Price</label>
                  <Item>
                    { getFieldDecorator(`channel_price${i+1}`, {
                      setFieldsValue: e.channelPrice,
                      initialValue: e.channelPrice
                    })(
                      <InputNumber
                        className='width-100'
                        onChange={(e) => this.handleChannel(e, 'channelPrice', i)}
                      />
                    )}
                  </Item>
                </Col>
                <Col xs={24} sm={8}>
                  <label>Unit of Measure</label>
                  <Item>
                    { getFieldDecorator(`unit_of_measure${i+1}`, {
                      rules: [
                        { required: true, message: 'Please enter Unit of Measure' }
                      ],
                      setFieldsValue: e.unitOfMeasure,
                      initialValue: e.unitOfMeasure
                    })(
                      <InputNumber
                        className='width-100'
                        onChange={(e) => this.handleChannel(e, 'unitOfMeasure', i)}
                      />
                    )}
                  </Item>
                </Col>
              </Card>
            </Row>
          )
        })}
      </>
    );
  }
}

let ChannelsTab = Form.create()(Channels);
export { ChannelsTab };