import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Card } from 'antd';
import { GeneralFields } from './Form/General';
import { Attributes } from './Form/Attributes';
import { Images } from './Form/Images';
import { Categories } from './Form/Categories';

const VariationFields = (props) => {
  const { handleSubmit, form } = props;

  return (
    <Form onSubmit={(e) => handleSubmit(e, form)}>
      <div className='d-flex-row justify-end m-15'>
        <Button className="mx-10" htmlType='submit'>Save</Button>
      </div>
      <Card>
        <GeneralFields {...props} />
        <Attributes {...props} />
        <Images {...props} /> 
        <Categories {...props} />
      </Card>
    </Form>
  )
}

let Fields = Form.create()(VariationFields);
export { Fields };
