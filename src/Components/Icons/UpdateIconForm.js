import React, { useState } from "react";
import firebase from 'firebase/app';
import FileUploader from 'react-firebase-file-uploader';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, Alert, message } from 'antd';


const UpdateOptionFormTemplate = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    const [iconURL, setIconURL] = useState("");
    const [isFileUploading, setIsFileUploading] = useState(false);

    const { getFieldDecorator } = props.form;
    const icon = props.selectedIcon;

    function handleUploadStart() {
        setIsLoading(true);
        setIsFileUploading(true);
        setLoadingMessage('Uploading Image...');
    }

    function handleUploadSuccess(filename) {
        setIsLoading(false);
        setIsFileUploading(false);
        message.success('Image Uploaded Successfully', 5);
        setIconURL(filename);
    }

    function handleUpdate(e) {
        e.preventDefault();
        props.closeModal();
        props.form.validateFields((err, values) => {
            if (!err) {
                values.iconURL = iconURL;
                props.updateIcon(icon.iconID, values)
                    .then(() => {
                        message.success('Icon is Updated', 6);
                        props.getIcons();
                        props.form.resetFields();
                    });

            }

        });
    }

    return (
        <>
            { isLoading && <Alert message={loadingMessage} type="info" />}
            <Form id='imForm' onSubmit={(e) => handleUpdate(e)}>
                <Form.Item className='py-5'>
                    {getFieldDecorator('iconName', {
                        rules: [{
                            required: true, message: 'Please Enter Icon Name!',
                        }],
                        setFieldsValue: icon.iconName,
                        initialValue: icon.iconName
                    })(
                        <Input
                            placeholder='Icon Name'
                            size='large'
                        />
                    )}
                </Form.Item>
                <FileUploader
                    className='width-100'
                    accept='image/*'
                    name='image'
                    storageRef={firebase.storage().ref('icons')}
                    onUploadStart={handleUploadStart}
                    onUploadSuccess={handleUploadSuccess}
                />

                <div style={{ borderTop: '1px solid #ccc', marginTop: '20px', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type="primary" htmlType="submit" disabled={isFileUploading}>
                        Update
                    </Button>
                </div>
            </Form>
        </>
    )
}

const UpdateOptionForm = Form.create()(UpdateOptionFormTemplate)

export { UpdateOptionForm };