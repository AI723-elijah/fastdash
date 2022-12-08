import React, { useState } from 'react';
import { Row, Col, Input, Select, Alert } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const env = process.env.REACT_APP_NAME;
const shipping = process.env.REACT_APP_SHIPPINGGROUPS.split(',') || [];

const AdditionalFields = ({ product, getProductsUrlKeys, setUserCanEnterUrlKey, userCanEnterUrlKey, configuredUrls, handleChange, handleSelect }) => {
  const[message, setMessage] = useState("");
  
  return (
    <Row gutter={16}>
      { env === 'mexmax' && <Col className='my-10' sm={12} xs={12}>
        <label>Sorting</label>
        <Input
          type='number'
          name='sorting'
          value={product.sorting}
          onChange={(e) => handleChange(e, 'product')}
        />
      </Col> }
      { env === 'mexmax' && <Col className='my-10' sm={12} xs={12}>
        <label>Manufacturer Item No.</label>
        <Input
          name='manufacturerItemNo'
          value={product.manufacturerItemNo}
          onChange={(e) => handleChange(e, 'product')}
        />
      </Col> }
      { env === 'mexmax' && <Col className='my-10' sm={12} xs={12}>
        <label>Warehouse Location</label>
        <Input
          name='warehouseLocation'
          value={product.warehouseLocation}
          onChange={(e) => handleChange(e, 'product')}
        />
      </Col> }
      { env === 'mexmax' && <Col className='my-10' sm={12} xs={12}>
        <label>Conversion Factor</label>
        <Input
          name='conversionFactor'
          value={product.conversionFactor}
          onChange={(e) => handleChange(e, 'product')}
        />
      </Col> }
      { env === 'mexmax' && <Col className='my-10' sm={12} xs={12}>
        <label>Cost Case</label>
        <Input
          name='costCase'
          value={product.costCase}
          onChange={(e) => handleChange(e, 'product')}
        />
      </Col> }
      { env === 'mexmax' && <Col className='my-10' sm={12} xs={12}>
        <label>Cost PC</label>
        <Input
          name='costPC'
          value={product.costPC}
          onChange={(e) => handleChange(e, 'product')}
        />
      </Col> }
      { env === 'mexmax' && <Col className='my-10' sm={12} xs={12}>
        <label>Sell PC</label>
        <Input
          name='sellPC'
          value={product.sellPC}
          onChange={(e) => handleChange(e, 'product')}
        />
      </Col> }
      { env === 'mexmax' && <Col className='my-10' sm={12} xs={12}>
        <label>Margin Profit</label>
        <Input
          name='marginProfit'
          value={product.marginProfit}
          onChange={(e) => handleChange(e, 'product')}
        />
      </Col> }
      { env === 'westgate' && <Col className='my-10' sm={12} xs={12}>
        <label>Technical Specs</label>
        <TextArea
          name='technicalSpecs'
          value={product.technicalSpecs}
          onChange={(e) => handleChange(e, 'product')}
        />
      </Col> }
      { env === 'westgate' && <Col className='my-10' sm={12} xs={12}>
        <label>Application</label>
        <TextArea
          name='application'
          value={product.application}
          onChange={(e) => handleChange(e, 'product')}
        />
      </Col> }
      { env === 'westgate' && <Col className='my-10' sm={12} xs={12}>
        <label>URL Key</label>
        <Input
          name='urlKey'
          // disabled={!userCanEnterUrlKey}
          value={product.urlKey}
          onInput={(e) => {
            setUserCanEnterUrlKey(false)
            const { value } = e.target
            handleChange(e, 'product')
            setMessage("");
            if(value.length > 0){
            getProductsUrlKeys(product.urlKey);
            if(configuredUrls && configuredUrls.productUrlKeys.length > 0){
              setMessage("Key Exists");
              setUserCanEnterUrlKey(false)
            }else if(configuredUrls && configuredUrls.productUrlKeys.length === 0){
              handleChange(e, 'product')
              setMessage("");
            }else{
              handleChange(e, 'product')
              setMessage("");
            }
            }
          }}
        />
        {
          message.length > 0 && 
          <>
            <Alert
              message="URL Key Exists"
              description="This URL Key is already defined for another Product. It will be modified to create a unique URL Key"
              type="error"
              closable
              onClose={()=>{setMessage("")}}
            />
          </>
        }
      </Col> }
      { shipping.length > 0 &&
        <Col className='my-10' sm={12} xs={12}>
          <label>Amazon Shipping Groups</label>
          <Select
            value={product.amazonShippingGroups}
            onChange={e => handleSelect(e, 'product', 'amazonShippingGroups')}
          >
            { shipping.map(item => {
              return (
                <Option key={item} value={item}>{item}</Option>
              )
            })}
          </Select>
        </Col>
      }
      { env === 'westgate' && <Col className='my-10' sm={12} xs={12}>
        <label>Title Tags</label>
        <Input
          name='titleMetaTags'
          value={product.titleMetaTags}
          onChange={(e) => handleChange(e, 'product')}
        />
      </Col> }
      { env === 'westgate' && <Col className='my-10' sm={12} xs={12}>
        <label>Description Tags</label>
        <Input
          name='descriptionTags'
          value={product.descriptionTags}
          onChange={(e) => handleChange(e, 'product')}
        />
      </Col> }
    </Row>
  );
}

export  { AdditionalFields };
