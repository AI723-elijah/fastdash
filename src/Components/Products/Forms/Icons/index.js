import React, { Component } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Card, Button, Row, Col, Select } from 'antd';

const { Item } = Form;
const { Option } = Select;

class Icons extends Component {
  componentDidMount() {
    const { getIcons } = this.props;

    getIcons();
  }

  handleIcon = (e, i) => {
    const { icons, handleStateChange } = this.props;
    const c = icons.find(icon => icon.iconID === e);
    let productIcons = [...this.props.productIcons];

    productIcons[i].iconID = c.iconID;
    productIcons[i].iconDetails = c;

    handleStateChange(productIcons, 'productIcons');
  }

  render() {
    const { icons, productIcons, handleAddToArray, form: { getFieldDecorator } } = this.props;
    const icon = {
      iconID: '',
      iconDetails: {
        iconID: '',
        iconName: '',
        iconURL: ''
      }
    }

    return (
      <>
        <div className='mx-15 d-flex-row justify-end'>
          <Button onClick={() => handleAddToArray('productIcons', icon)}>Add Icon</Button>
        </div>
        <Row className='my-10' gutter={16}>
          { productIcons.map((e, i) => {
            return (
              <Col key={i} xs={24} >
                <Card hoverable className='my-10'>
                  <label>Select Icon</label>
                  <Item>
                    { getFieldDecorator(`icon${i+1}`, {
                      rules: [{ required: true, message: 'Please select Icon!' }],
                      setFieldsValue: e.iconID,
                      initialValue: e.iconID
                    })(
                      <Select
                        className='width-100'
                        showSearch
                        onChange={e => this.handleIcon(e, i)}
                      >
                        {icons && icons.map(c => {
                          return (
                            <Option key={c.iconID} value={c.iconID}>{c.iconName}</Option>
                          )
                        })}
                      </Select>
                    )}
                  </Item>
                </Card>
              </Col>
            )
          })}
        </Row>
      </>
    );
  }
}

let IconsTab = Form.create()(Icons);
export { IconsTab };
