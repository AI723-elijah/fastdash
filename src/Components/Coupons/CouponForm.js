import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Select, Row, Col, Button } from 'antd';

const { Item } = Form;
const { Option } = Select;

let CouponForm = ({ handleSave, form, form: { getFieldDecorator }, couponDetail, websitesList, modalType }) => {
  return (
    <Form id='imForm' onSubmit={(e) => handleSave(e, form)}>
      <Row gutter={16}>
        <Col xs={24} sm={16}>
          <label>Coupon</label>
          <Item className='py-5'>
            { getFieldDecorator('coupon', {
              rules: [{
                required: true, message: 'Please Enter Coupon',
              }],
              initialValue: couponDetail && couponDetail.coupon 
            })(
              <Input
                placeholder='Coupon'
                size='large'
                disabled={modalType === 'Add Coupon' ? false : true}
              />
            )}
          </Item>
        </Col>
        <Col xs={24} sm={8}>
          <label>Discount (%)</label>
          <Item className='py-5'>
            { getFieldDecorator('discount', {
              rules: [{
                required: true, message: 'Please Enter Discount Percentage!',
              }],
              initialValue: couponDetail && couponDetail.discount
            })(
              <Input
                placeholder='Discount'
                size='large'
              />
            )}
          </Item>
        </Col>
        <Col xs={24} sm={12}>
          <label>State Date-Time</label>
          <Item className='py-5'>
            { getFieldDecorator('startDateTime', {
              rules: [{
                required: true, message: 'Please Enter State Date-Time!',
              }],
              initialValue: couponDetail && couponDetail.startDateTime
            })(
              <Input
                placeholder='State Date-Time'
                size='large'
                type='datetime-local'
              />
            )}
          </Item>
        </Col>
        <Col xs={24} sm={12}>
          <label>End Date-Time</label>
          <Item className='py-5'>
            { getFieldDecorator('endDateTime', {
              rules: [{
                required: true, message: 'Please Enter End Date-Time!',
              }],
              initialValue: couponDetail && couponDetail.endDateTime
            })(
              <Input
                 placeholder='End Date-Time'
                size='large'
                type='datetime-local'
              />
            )}
          </Item>
        </Col>
        <Col xs={24} sm={24}>
          <label>Websites</label>
          <Item className='py-5'>
            { getFieldDecorator('websites', {
              rules: [{
                required: true, message: 'Please Select Websites!',
              }],
              initialValue: couponDetail && couponDetail.websites
            })(
              <Select
                placeholder='Websites'
                size='large'
                multiSelect
              >
                {websitesList && websitesList.map((web) => (
                  <Option value={web.websiteID}>{web.name}</Option>
                  ))}
              </Select>
            )}
          </Item>
        </Col> 
      </Row>
      <Row>
        <Col xs={24}>
            <div style={{ borderTop: '1px solid #ccc', marginTop: '20px', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </div>
        </Col>
      </Row>
    </Form>
  );
}

CouponForm = Form.create()(CouponForm)
export { CouponForm };
