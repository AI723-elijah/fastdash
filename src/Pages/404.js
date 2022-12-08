import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

const NotFound = () => {
  return (
    <Result
      status='404'
      title='404'
      subTitle='SORRY, WE CANNOT FIND THE PAGE YOU ARE LOOKING FOR'
      extra={
        <Link to='/products'>
          <Button type='primary'>View Products</Button>
        </Link>
      }
    />
  );
}

export { NotFound };
