import React from 'react';
import { Row, Col, Switch } from 'antd';
import { dateString } from '../../../../Common/dateString';
import { timeString } from '../../../../Common/timeString';

const Info = ({ handleSelect, addVariations, addTierPrices, handleSwitch, product }) => {
  return (
    <Row gutter={16}>
      <Col className='my-10' span={24}>
        <label>Add Variations</label>
        <Switch
          className='mx-10'
          checked={addVariations}
          onChange={(e) => handleSwitch(e, 'addVariations')}
        />
      </Col>
      <Col className='my-10' span={24}>
        <label>Add Tier Prices</label>
        <Switch
          className='mx-10'
          checked={addTierPrices}
          onChange={(e) => handleSelect(e, 'product', 'tierPricing')}
        />
      </Col>
      <Col className='my-10' span={24}>
        <label>Created By: </label>
        <label>{product.created_by}</label>
      </Col>
      <Col className='my-10' span={24}>
        <label>Modified By: </label>
        <label>{product.modified_by}</label>
      </Col>
      <Col className='my-10' span={24}>
        <label>Created At: </label>
        <label>{product.created_at ? `${dateString(product.created_at)} at ${timeString(product.created_at)}` : ''}</label>
      </Col>
      <Col className='my-10' span={24}>
        <label>Updated At: </label>
        <label>{product.updated_at ? `${dateString(product.updated_at)} at ${timeString(product.updated_at)}` : ''}</label>
      </Col>
    </Row>
  );
}

export { Info };
