import React, { useState } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Select, Row, Col, Button } from 'antd';

const { Item } = Form;
const { Option } = Select;

let UserForm = ({ user, formType, handleSave, form, form: { getFieldDecorator }, userInfo }) => {

  const [role, setRole] = useState(userInfo.role || 'admin');

  return (
    <Form id='imForm' onSubmit={(e) => handleSave(e, form)}>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <label>First Name</label>
          <Item className='py-5'>
            {getFieldDecorator('fname', {
              rules: [{
                required: true, message: 'Please Enter First Name!',
              }],
              initialValue: userInfo && userInfo.fname
            })(
              <Input
                placeholder='First Name'
                size='large'
              />
            )}
          </Item>
        </Col>
        <Col xs={24} sm={12}>
          <label>Last Name</label>
          <Item className='py-5'>
            {getFieldDecorator('lname', {
              rules: [{
                required: true, message: 'Please Enter Last Name!',
              }],
              initialValue: userInfo && userInfo.lname
            })(
              <Input
                placeholder='Last Name'
                size='large'
              />
            )}
          </Item>
        </Col>
        <Col xs={24} sm={24}>
          <label>Email</label>
          <Item className='py-5'>
            {getFieldDecorator('email', {
              rules: [{
                required: true, message: 'Please Enter Email!',
              }],
              initialValue: userInfo && userInfo.email
            })(
              <Input
                placeholder='Email'
                size='large'
                disabled={userInfo && userInfo.email ? true : false}
              />
            )}
          </Item>
        </Col>
        <Col xs={24} sm={12}>
          <label>Role</label>
          <Item className='py-5'>
            {getFieldDecorator('role', {
              rules: [{
                required: true, message: 'Please Enter Role!',
              }],
              initialValue: (userInfo && userInfo.role) || 'admin'
            })(
              <Select
                placeholder='Role'
                size='large'
                onChange={(e) => setRole(e)}
              >
                <Option value='admin'>Admin</Option>
                {user === 'portalUser' ?
                  <Option value='contact'>Contact</Option>
                  :
                  <Option value='user'>User</Option>
                }
                {user === 'dashboardUser' &&
                  <Option value='SEO'>SEO</Option>
                }
              </Select>
            )}
          </Item>
          <p style={{ marginTop: '-20px', marginLeft: '5px', width: '200%' }}>
            {
              user === 'dashboardUser' && (
                role === 'admin' ? 'An admin can see every tab on the dashboard. In Dashboard Users, an admin can view, create, edit and delete other users.' :
                  role === 'user' ? 'A user can see every tab on the dashboard. In Dashboard Users, a user can only view and delete other users.' :
                    role === 'SEO' ? 'A SEO user can only see the following tabs: Categories and News' :
                      role === 'contact' ? 'contact description' : ''
              )
            }
          </p>
        </Col>
        <Col xs={24} sm={12}>
          <label>Status</label>
          <Item className='py-5'>
            {getFieldDecorator('status', {
              rules: [{
                required: true, message: 'Please Enter Status!',
              }],
              initialValue: (userInfo && userInfo.status) || 'Active'
            })(
              <Select
                placeholder='Status'
                size='large'
              >
                <Option value='Inactive'>Inactive</Option>
                <Option value='Active'>Active</Option>
              </Select>
            )}
          </Item>
        </Col>
        {user === 'portalUser' &&
          <Col xs={24}>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <label>Customer Type</label>
                <Item className='py-5'>
                  {getFieldDecorator('customerType', {
                    rules: [{
                      // required: true, message: 'Please Enter Customer Type!',
                    }],
                    initialValue: userInfo && userInfo.customerType
                  })(
                    <Select
                      placeholder='Customer Type'
                      size='large'
                    >
                      <Option value='Basic'>Basic</Option>
                      <Option value='Distributor'>Distributor</Option>
                      <Option value='Representative'>Representative</Option>
                    </Select>
                  )}
                </Item>
              </Col>
              {form && form.getFieldValue('customerType') === 'Distributor' ?
                <Col xs={24} sm={12}>
                  <label>Account IDs</label>
                  <Item className='py-5'>
                    {getFieldDecorator('accountID', {
                      rules: [{
                        required: true, message: 'Please Enter Account ID!',
                      }],
                      initialValue: userInfo && userInfo.accountID
                    })(
                      <Input
                        placeholder='Account ID'
                        size='large'
                      />
                    )}
                  </Item>
                </Col>
                :
                form && form.getFieldValue('customerType') === 'Representative' ?
                  <>
                    <Col xs={24} sm={12}>
                      <label>Sales Rep Ids</label>
                      <Item className='py-5'>
                        {getFieldDecorator('salesRepID', {
                          rules: [{
                            required: true, message: 'Please Enter Sales Rep Id',
                          }],
                          initialValue: userInfo && userInfo.salesRepID
                        })(
                          <Input
                            placeholder='Sales Rep Id'
                            size='large'
                          />
                        )}
                      </Item>
                    </Col>
                    <Col xs={24} sm={12}></Col>

                    <Col xs={24} sm={12}>
                      <label>Account Ids</label>
                      <Item className='py-5'>
                        {getFieldDecorator('assignedAccountID', {
                          rules: [{
                            required: false
                          }],
                          initialValue: userInfo && userInfo.assignedAccountID
                        })(
                          <Input
                            placeholder='Account Id'
                            size='large'
                          />
                        )}
                      </Item>
                    </Col>
                  </>
                  :
                  null
              }
            </Row>
          </Col>
        }
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

UserForm = Form.create()(UserForm)
export { UserForm };
