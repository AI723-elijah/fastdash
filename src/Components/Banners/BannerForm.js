import React, { useState } from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, message } from 'antd';
import firebase from 'firebase/app';
import 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';

const { Item } = Form;

let BannerForm = ({ handleSave, form, form: { getFieldDecorator }, handleUploadStart, handleUploadSuccess, rep }) => {
  const [ imageSizeGreater, setImageSizeGreater ] = useState(false)
  return (
    <Form id='imForm' onSubmit={(e) => {
      e.preventDefault()
      if (imageSizeGreater === true){
        message.error('Image NOT Uploaded. Size Exceeds the Max Size Limit of 1MB. Please upload another Image', 1)
      } else{
        handleSave(e, form)
      }
    }}>
      <Item className='py-2'>
        { getFieldDecorator('link', {
          rules: [{
            required: true, message: 'Please Enter Banner Link!',
          }],
          initialValue: rep.link
        })(
          <Input
            placeholder='Link'
            size='large'
          />
        )}
      </Item>
      <Item className='py-2'>
        { getFieldDecorator('sort', {
          rules: [{
            required: true, message: 'Please Enter Sort Number!',
          }],
          initialValue: rep.sort
        })(
          <Input
            placeholder='Sort'
            size='large'
            type='number'
          />
        )}
      </Item>
      <label>Upload Banner</label>
      <FileUploader
        className='width-100 my-10'
        accept='image/*'
        name='image'
        storageRef={firebase.storage().ref('bannerImages')}
        onUploadStart={e => {
          const { size } = e
          if(size > 2000000){
            setImageSizeGreater(true)
          }else{
            setImageSizeGreater(false)
          }
         
          handleUploadStart(e)
        }}
        onUploadSuccess={handleUploadSuccess}
      />
    </Form>
  );
}

BannerForm = Form.create()(BannerForm)
export { BannerForm };
