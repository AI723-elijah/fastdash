import React, { Component } from 'react';
import { message } from 'antd';
import { LoginComponent } from '../Components/Login';

class Login extends Component {

  handleSubmit = (e, form) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values)
          .then(() => {
            if (localStorage.getItem('newUser') === 'true') {
              this.props.history.push('/changePassword')
            }
            else if (localStorage.getItem('userRole') === 'SEO') {
              this.props.history.push('/categories')
            }
            else {
              this.props.history.push('/products');
            }
          })
          .catch(err => {
            message.error(err.payload.response.data.error || 'Login Failed!', 5);
          });
      }
    });
  }

  render() {
    return (
      <LoginComponent
        error={this.props.error}
        loading={this.props.loading}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
export { Login };
