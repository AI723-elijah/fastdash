import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Select } from 'antd';
import firebase from 'firebase/app';
import 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';

const { Option } = Select;

const { Item } = Form;

let SlideInForm = props => {
    const { handleSave, form, form: { getFieldDecorator }, handleUploadStart, handleUploadSuccess, rep, categories } = props;
    return (
        <Form id='imForm' onSubmit={(e) => handleSave(e, form)}>
            <Item className='py-5'>
                {getFieldDecorator('title', {
                    rules: [{
                        required: true, message: 'Please Enter title!',
                    }],
                    initialValue: rep.title
                })(
                    <Input
                        placeholder='Title'
                        size='large'
                    />
                )}
            </Item>
            <Item className='py-5'>
                {getFieldDecorator('description', {
                    rules: [{
                        required: true, message: 'Please Enter Description!',
                    }],
                    initialValue: rep.description
                })(
                    <Input
                        placeholder='Description'
                        size='large'
                    />
                )}
            </Item>
            <Item className='py-5'>
                {getFieldDecorator('sort', {
                    rules: [{
                        required: true, message: 'Please Enter Sort!',
                    }],
                    initialValue: rep.sort
                })(
                    <Input
                        placeholder='Sort'
                        size='large'
                    />
                )}
            </Item>
            <Item className='py-5'>
                {getFieldDecorator('category', {
                    rules: [{
                        required: true, message: 'Please Select Category!',
                    }],
                    initialValue: rep.category
                })(
                    <Select placeholder="Select Category">
                        {
                            categories.map(category => {
                                return(
                                    <Option value={category.categoryName} key={category.categoryName}>{category.categoryName}</Option> 
                                )
                            })
                        }
                    </Select>
                )}
            </Item>
            <FileUploader
                className='width-100'
                accept='image/*'
                name='image'
                storageRef={firebase.storage().ref('homepageCategoryImages')}
                onUploadStart={handleUploadStart}
                onUploadSuccess={handleUploadSuccess}
            />
        </Form>
    );
}

SlideInForm = Form.create()(SlideInForm)
export { SlideInForm };
