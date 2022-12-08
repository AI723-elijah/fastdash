import React, { Component } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, Row, Col, Slider, Select, Button } from 'antd';

const { Panel } = Collapse;
const { Option } = Select;
const initialValues = { category: [], channel: [], price: [0, 1000], status: '' };
class Filters extends Component {
  constructor() {
    super();

    this.state = {
      values: { ...initialValues },
      applied: false
    }
  }

  handleChange = (value, name) => {
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value
      }
    }));
  }

  handleApply = () => {
    const { applyFilter } = this.props;
    const { values } = this.state;
    this.setState({ applied: true });

    applyFilter({ ...values });
  }

  handleClear = () => {
    const { fetchSelectedProducts } = this.props;
    const { applied } = this.state;
    this.setState({ values: { ...initialValues }, applied: false });
    if(applied) {
      fetchSelectedProducts(0);
    } 
  }

  render() {
    const { categories, channels } = this.props;
    const { values } = this.state;
    const isEmpty = values.category || values.channel || values.price || values.status ? false : true;

    return (
      <Collapse
        className='my-10'
        bordered={false}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      >
        <Panel header='Filters'>
          <Row gutter={16}>
            <Col md={6} sm={12} xs={24}>
              <label>Status</label>
              <Select
                className='width-100'
                onChange={e => this.handleChange(e, 'status')}
                value={values.status}
              >
                <Option value='active'>Active</Option>
                <Option value='inactive'>Inactive</Option>
              </Select>
            </Col>
            <Col md={6} sm={12} xs={24}>
              <label>Channels</label>
              <Select
                className='width-100'
                mode='multiple'
                onChange={e => this.handleChange(e, 'channel')}
                value={values.channel}
                showSearch
                optionFilterProp='children'
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                { channels.map(channel => 
                  <Option key={channel.channelID} value={channel.channelID}>{channel.channelName}</Option>
                )}
              </Select>
            </Col>
            <Col md={6} sm={12} xs={24}>
              <label>Price</label>
              <Slider
                range
                onChange={e => this.handleChange(e, 'price')}
                value={values.price}
                min={0}
                max={1000}
              />
            </Col>
            <Col md={6} sm={12} xs={24}>
              <label>Categories</label>
              <Select
                className='width-100'
                mode='multiple'
                onChange={e => this.handleChange(e, 'category')}
                value={values.category}
                showSearch
                optionFilterProp='children'
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                { categories.map(category =>
                  <Option key={category.channelCategoryID} value={category.channelCategoryID}>
                    {category.categoryName}
                  </Option>
                )}
              </Select>
            </Col>
          </Row>
          <div className='d-flex-row justify-end'>
            <Button className='m-15' disabled={isEmpty} onClick={this.handleClear}>Clear Filters</Button>
            <Button className='my-15' disabled={isEmpty} onClick={this.handleApply}>Apply Filters</Button>
          </div>
        </Panel>
      </Collapse>
    );
  }
}

export { Filters };
