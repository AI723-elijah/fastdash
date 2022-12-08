import React from 'react';
import { Card, Input } from 'antd';

const { TextArea } = Input;

const NotesTab = ({ handleChange, product }) => {
  return (
    <Card title='Product Notes'>
      <label>Add Product Notes</label>
      <TextArea
        className='width-100'
        name='notes'
        value={product.notes}
        onChange={(e) => handleChange(e, 'product')}
        autosize={{ minRows: 3 }}
      />
    </Card>
  );
}

export { NotesTab };
