import React, { Component } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Card, Button, message } from 'antd';
import { IMModal } from '../Common/Modal';
import { List } from '../Components/SlideIn/List';
import { SlideInForm } from '../Components/SlideIn/SlideInForm';

class SlideIn extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            imageURL: '',
            categories: []
        };
    }

    componentDidMount() {
        const { getSlideIns, getCategories } = this.props;
        getCategories()
            .then((response) => {
                this.setState({
                    categories: response.payload
                })
            })
        getSlideIns();
    }

    handleModal = values => {
        this.setState({ open: !this.state.open });
        if (!this.state.open) {
            if (values && 'ID' in values) {
                this.props.editRep(values);
            } else {
                this.props.editRep({
                    title: '',
                    description: '',
                    sort: ''
                })
            }
        }
    }

    handleDelete = values => {
        const { getSlideIns, deleteSlideIn } = this.props;
        deleteSlideIn(values.ID)
            .then(() => {
                getSlideIns();
                message.success('Slide In Deleted', 5);
                
            })
    }

    handleSave = (e, form) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                const { getSlideIns, saveSlideIn, updateSlideIn } = this.props;
                values.imageURL = this.state.imageURL
                this.handleModal();
                const id = this.props.rep.ID;
                if (!id) {
                    saveSlideIn(values)
                        .then(() => {
                            message.success('SlideIn is Added', 5);
                            getSlideIns();
                        })
                } else {
                    values.ID = id;
                    if(!values.imageURL) {
                        values.imageURL = this.props.rep.imageURL;
                    }
                    updateSlideIn(values)
                        .then(() => {
                            message.success('SlideIn is Updated', 5);
                            getSlideIns();
                        })
                }
            }
        });
    }

    handleUploadStart = () => {
        this.props.startLoading();
    }

    handleUploadSuccess = (filename, name) => {
        message.success('Image Uploaded Successfully!', 5);
        this.setState({ imageURL: filename });
        this.props.stopLoading();
    }

    render() {
        const { open } = this.state;
        return (
            <Card title='SlideIn' className='width-100'>
                <div className='d-flex-row justify-end'>
                    <Button icon={<PlusSquareOutlined />} onClick={this.handleModal}>Add Slide In</Button>
                </div>
                <List slideIns={this.props.slideIns} loading={this.props.loading} handleModal={this.handleModal} handleDelete={this.handleDelete} />
                { open &&
                    <IMModal
                        title='SlideIn'
                        open={open}
                        Component={SlideInForm}
                        handleSave={this.handleSave}
                        handleModal={this.handleModal}
                        handleUploadStart={this.handleUploadStart}
                        handleUploadSuccess={this.handleUploadSuccess}
                        loading={this.props.loading}
                        rep={this.props.rep}
                        categories={this.state.categories}
                    />
                }
            </Card>
        );
    }
}

export { SlideIn };
