
import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Row, Col, Button } from 'antd';
import 'firebase/storage';

const { Item } = Form;

let ChangePdfPassword = ({ 
    hanldeChangePassword, form, form: { getFieldDecorator }, loading, modalType, handleVerifyPassword
}) => {
  return (
    modalType === 'Change Password' ?
    <Form id='imForm' onSubmit={(e) => hanldeChangePassword(e, form)}>
      <Row gutter={16}>
        <Col xs={24} sm={{offset: 6, span: 12}}>
          <label>Current Password</label>
          <Item className='py-5'>
            {getFieldDecorator('currentPassword', {
              rules: [{
                required: true, message: 'Current Password',
              }],
            })(
                <Input
                placeholder='Current Password'
                size='large'
                type='password'
              />
            )}
          </Item>
        </Col>
        <Col xs={24} sm={{offset: 6, span: 12}}>
          <label>New Password</label>
          <Item className='py-5'>
            {getFieldDecorator('newPassword', {
              rules: [{
                required: true, message: 'New Password',
              }],
            })(
                <Input
                placeholder='New Password'
                size='large'
                type='password'
              />
            )}
          </Item>
        </Col>
        <Col xs={24} sm={{offset: 6, span: 12}}>
          <label>New Password</label>
          <Item className='py-5'>
            {getFieldDecorator('confirmNewPassword', {
              rules: [{
                required: true, message: 'Confirm New Password',
              }],
            })(
                <Input
                placeholder='Confirm New Password'
                size='large'
                type='password'
              />
            )}
          </Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
            <div style={{ borderTop: '1px solid #ccc', marginTop: '20px', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="primary" htmlType="submit" disabled={loading}>
                    Submit
                </Button>
            </div>
        </Col>
      </Row>
    </Form>
    :
    modalType === 'Verify Password' &&
    <Form id='imForm' onSubmit={(e) => handleVerifyPassword(e, form)}>
      <Row gutter={16}>
        <Col xs={24} sm={{offset: 6, span: 12}}>
          <label>Password</label>
          <Item className='py-5'>
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Password',
              }],
            })(
                <Input
                placeholder='Password'
                size='large'
                type='password'
              />
            )}
          </Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
            <div style={{ borderTop: '1px solid #ccc', marginTop: '20px', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <Button type="primary" htmlType="submit" disabled={loading}>
                    Submit
                </Button>
            </div>
        </Col>
      </Row>
    </Form>
  );
}

ChangePdfPassword = Form.create()(ChangePdfPassword)
export { ChangePdfPassword };
