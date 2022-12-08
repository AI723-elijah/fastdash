import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from 'antd';
import ReactQuill from 'react-quill';
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'react-quill/dist/quill.snow.css';
import './Styles/List.scss';

const { Item } = Form;
const { TextArea } = Input;

let NewsForm = props => {
  const { handleSave, desc, form, form: { getFieldDecorator }, handleDesc, handleUploadStart, handleUploadSuccess, rep } = props;

  return (
    <Form id='imForm' onSubmit={(e) => handleSave(e, form)}>
      <Item className='py-5'>
        { getFieldDecorator('title', {
          rules: [{
            required: true, message: 'Please Enter Title!',
          }],
          initialValue: rep.title
        })(
          <Input
            placeholder='News Title'
            size='large'
          />
        )}
      </Item>
      <Item className='py-5'>
        { getFieldDecorator('shortDesc', {
          rules: [{
            required: true, message: 'Please Enter Short Description!',
          }],
          initialValue: rep.shortDesc
        })(
          <TextArea
            name='shortDesc'
            placeholder='Short Description'
          />
        )}
      </Item>
      <Item className='py-5'>
        { getFieldDecorator('titleTag', {
          // rules: [{
          //   required: true, message: 'Please Enter Title Tag!',
          // }],
          initialValue: rep.titleTag
        })(
          <Input
            placeholder='News Title Tag'
            size='large'
          />
        )}
      </Item>
      <Item className='py-5'>
        { getFieldDecorator('descriptionTag', {
          // rules: [{
          //   required: true, message: 'Please Enter Description Tag!',
          // }],
          initialValue: rep.descriptionTag
        })(
          <Input
            placeholder='News Description Tag'
            size='large'
          />
        )}
      </Item>
      <div className='py-5'>
        <ReactQuill
          value={desc}
          placeholder="News Description"
          onChange={handleDesc}
        />
      </div>
      <FileUploader
        className='width-100'
        accept='image/*'
        name='image'
        storageRef={firebase.storage().ref('newsImages')}
        onUploadStart={handleUploadStart}
        onUploadSuccess={handleUploadSuccess}
      />
    </Form>
  );
}

NewsForm = Form.create()(NewsForm)
export { NewsForm };
