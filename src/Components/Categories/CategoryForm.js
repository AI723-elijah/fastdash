import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Select } from 'antd';
import firebase from 'firebase/app';
import 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';

const { Item } = Form;
const { Option } = Select;

let CategoryForm = ({ handleSave, form, form: { getFieldDecorator }, handleUploadStart, handleUploadSuccess, category }) => {

  const role = localStorage.getItem('userRole')
  const getTagsFromString = (str = '') => {
    const tags = str ? str.split(',') : []
    return tags
  }

  return (
    <Form id='imForm' onSubmit={(e) => handleSave(e, form)}>
      {role !== 'SEO' &&
        <>
          <Item className='py-5' label="Name">
            {getFieldDecorator('categoryName', {
              rules: [{
                required: true, message: 'Please Enter Category Name!',
              }],
              initialValue: category.categoryName
            })(
              <Input
                placeholder='Category Name'
                size='large'
              />
            )}
          </Item>
          <Item className='py-5' label="Display">
            {getFieldDecorator('display', {
              rules: [{
                required: true, message: 'Please Select an option',
              }],
              initialValue: category.display
            })(
              <Select size="large">
                <Option value={1}>Yes</Option>
                <Option value={0}>No</Option>
              </Select>
            )}
          </Item>
          <Item className='py-5' label="Sort">
            {getFieldDecorator('position', {
              rules: [{
                required: true, message: 'Please Enter Sort Position',
              }],
              initialValue: category.position
            })(
              <Input
                placeholder='Sort'
                size='large'
              />
            )}
          </Item>
          <Item className='py-5' label="Link">
            {getFieldDecorator('link', {
              rules: [{
                required: false
              }],
              initialValue: category.link
            })(
              <Input
                placeholder='Link'
                size='large'
              />
            )}
          </Item>
        </>
      }
      <Item className='py-5' label="About">
        {getFieldDecorator('about', {
          rules: [{
            required: false
          }],
          initialValue: category.about
        })(
          <Input
            placeholder='About'
            size='large'
          />
        )}
      </Item>
      <Item className='py-5' label="Title Tags">

        {getFieldDecorator('titleMetaTags', {
          initialValue: getTagsFromString(category.titleMetaTags)
        })(
          <Select
            showSearch={false}
            name='titleMetaTags'
            mode="tags"
            placeholder="Please enter title meta tags"
          >
          </Select>
        )}
      </Item>
      <Item className='py-5' label="Description Tags">
        {getFieldDecorator('descriptionTags', {
          initialValue: getTagsFromString(category.descriptionTags)
        })(
          <Select
            name='descriptionTags'
            mode="tags"
            placeholder="Please enter description meta tags"
          >
          </Select>
        )}
      </Item>
      {role !== 'SEO' &&
        <>
          <label>Category Image</label>
          < FileUploader
            className='width-100 my-10'
            accept='image/*'
            name='image'
            storageRef={firebase.storage().ref('categoryImages')}
            onUploadStart={handleUploadStart}
            onUploadSuccess={handleUploadSuccess}
          />
        </>
      }
    </Form>
  );
}

CategoryForm = Form.create()(CategoryForm)
export { CategoryForm };
