import React, { Component } from 'react';
import { message } from 'antd';
import { ChangePasswordComponent } from '../Components/ChangePassword';

class ChangePassword extends Component {

  handleSubmit = (e, form) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        if (values.newPassword !== values.confirmNewPassword) {
          message.error('Confirm New Password does not match to New Password', 5);
        }
        else {
          this.props.changePassword(values)
            .then(() => {
              if (localStorage.getItem('userRole') === 'SEO') {
                this.props.history.push('/categories')
              }
              else {
                this.props.history.push('/products');
              }
            })
            .catch(err => {
              message.error(err.payload, 5);
            });
        }
      }
    });
  }

  render() {
    return (
      <ChangePasswordComponent
        error={this.props.error}
        loading={this.props.loading}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
export { ChangePassword };
