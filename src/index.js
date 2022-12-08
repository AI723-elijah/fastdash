import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppContainer } from './Redux/Containers';
import { store } from './Redux';
import 'antd/dist/antd.css';
import './index.scss';
/* eslint-disable */

import(`./Styles/${process.env.REACT_APP_STYLES}`);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
