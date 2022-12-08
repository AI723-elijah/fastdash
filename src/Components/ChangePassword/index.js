import React from 'react';
import { LockOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Card, Col, Row, Input, Button, Typography, Alert } from 'antd';
import './index.scss';

const { Item } = Form;
const { Title } = Typography;

const ChangePasswordForm = ({ handleSubmit, form, form: { getFieldDecorator }, loading, error }) => {
  return (
    <Row gutter={16} className='height-100vh d-flex-row align-center'>
      <Col xs={1} sm={4} md={6} lg={8} />
      <Col xs={22} sm={16} md={12} lg={8}>
        <Card hoverable title={<img className='logo' src={`/Images/${process.env.REACT_APP_LOGO}`} alt='Logo' />} className='im-changePass-card'>
          <Title level={3}>FAS Change Password</Title>
          { error && !loading &&
            <Alert className='my-10' type='error' message={error} closable />
          }
          <Form onSubmit={(e) => handleSubmit(e, form)}>
            <Item className='py-5'>
              {getFieldDecorator('currentPassword', {
                rules: [{
                  required: true, message: 'Please Enter Your Current Password!',
                }]
              })(
                <Input
                  placeholder='Current Password'
                  addonBefore={<LockOutlined />}
                  size='large'
                  type='Password'
                />
              )}
            </Item>
            <Item className='py-5'>
              {getFieldDecorator('newPassword', {
                rules: [{
                  required: true, message: 'Please Enter Your New Password!',
                }]
              })(
                <Input
                  placeholder='New Password'
                  addonBefore={<LockOutlined />}
                  size='large'
                  type='Password'
                />
              )}
            </Item>
            <Item className='py-5'>
              {getFieldDecorator('confirmNewPassword', {
                rules: [{
                  required: true, message: 'Please Confirm Your New Password!',
                }]
              })(
                <Input
                  placeholder='Confirm New Password'
                  addonBefore={<LockOutlined />}
                  size='large'
                  type='Password'
                />
              )}
            </Item>
            <Button
              className='width-100'
              type='primary'
              htmlType='submit'
              loading={loading}
              disabled={loading}
            >
              Change Password
            </Button>
          </Form>
        </Card>
      </Col>
      <Col xs={1} sm={4} md={6} lg={8} />
    </Row>
  );
}

const ChangePasswordComponent = Form.create()(ChangePasswordForm)
export { ChangePasswordComponent };
