import React from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Card, Col, Row, Input, Button, Typography, Alert } from 'antd';
import './index.scss';

const { Item } = Form;
const { Title } = Typography;

const LoginForm = ({ handleSubmit, form, form: { getFieldDecorator }, loading, error }) => {
  return (
    <Row gutter={16} className='height-100vh d-flex-row align-center'>
      <Col xs={1} sm={4} md={6} lg={8} />
      <Col xs={22} sm={16} md={12} lg={8}>
        <Card hoverable title={<img className='logo' src={`/Images/${process.env.REACT_APP_LOGO}`} alt='Logo' />} className='im-login-card'>
          <Title level={3}>FAS Login</Title>
          { error && !loading &&
            <Alert className='my-10' type='error' message={error} closable />
          }
          <Form onSubmit={(e) => handleSubmit(e, form)}>
            <Item className='py-5'>
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'Invalid Email Address!',
                }, {
                  required: true, message: 'Please Enter Email Address!',
                }]
              })(
                <Input
                  placeholder='Email'
                  addonBefore={<MailOutlined />}
                  size='large'
                />
              )}
            </Item>
            <Item className='py-5'>
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please Enter Password!',
                }]
              })(
                <Input
                  placeholder='Password'
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
              Log in
            </Button>
          </Form>
        </Card>
      </Col>
      <Col xs={1} sm={4} md={6} lg={8} />
    </Row>
  );
}

const LoginComponent = Form.create()(LoginForm)
export { LoginComponent };
