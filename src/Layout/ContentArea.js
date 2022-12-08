import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { privateRoutes } from '../Routes/privateRoutes';
import { featureRoutes } from '../Routes/featureRoutes';
import { dynamicRoutes } from '../Routes/dynamicRoutes';

const { Content } = Layout;

const ContentArea = (props) => {
  const fRoutes = process.env.REACT_APP_FEATURES.split(',') || [];

  return (
    <Content className='max-height-100vh scroll-y'>
      <Switch>
        { privateRoutes.filter(e => localStorage.getItem('userRole') === 'SEO' ? 
        e.path === '/categories' || e.path === '/changePassword'
        : 
        e.path).map(e => {
          const { Component } = e;
          return <Route key={e.key} path={e.path} render={() => <Component {...props} />} />
        })}
        { featureRoutes.filter(e => localStorage.getItem('userRole') === 'SEO' ? 
          e.path === '/news'
          : 
          e.path).map(e => {
          const { Component } = e;
          return fRoutes.indexOf(e.key) > -1 ?
            <Route key={e.key} path={e.path} render={() => <Component {...props} />} />
            :
            null
        })}
        { dynamicRoutes.map(e => {
          const { Component } = e;
          return <Route key={e.key} path={e.path} render={() => <Component {...props} />} />
        })}
        <Redirect to={{ pathname: '/404' }} />
      </Switch>
    </Content>
  );
}

export { ContentArea };
