import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => localStorage.getItem('userEmail') ?
        rest.location.pathname === '/' ?
        localStorage.getItem('newUser') === 'true' ?
              <Redirect to={{ pathname: '/changePassword' }} /> :
          <Redirect to={{ pathname: '/products' }} /> :
          <Component {...rest} />
        :
        <Redirect to={{ pathname: '/login' }} />
      }
    />
  )
}

export { PrivateRoutes };
