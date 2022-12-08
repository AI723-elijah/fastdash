import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { routes } from '../Routes/routes';
import TagManager from 'react-gtm-module';
import { PrivateRoutes } from './PrivateRoutes';
import { DashboardLayout } from '../Layout';

const App = (props) => {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-KDWFSKP' });
  }, []);
  return (
    <Switch>
      {routes.map(r => {
        const { path, Component } = r;
        return (
          <Route
            key={path}
            path={path}
            render={p => localStorage.getItem('userEmail') ?
              localStorage.getItem('newUser') === 'true' ?
              <Redirect to={{ pathname: '/changePassword' }} /> :
              <Redirect to={{ pathname: '/products' }} /> :
              <Component {...p} />
            }
          />
        );
      })}
      <PrivateRoutes {...props} path='/' component={DashboardLayout} />
    </Switch>
  );
}

export { App };
