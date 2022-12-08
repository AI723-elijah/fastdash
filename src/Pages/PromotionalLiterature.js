import React, { Component } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Card, Button, message, Modal } from 'antd';
import { List } from '../Components/PromotionalLiterature/List';
import { LiteratureForm } from '../Components/PromotionalLiterature/PromotionalLiteratureForm';

class Literature extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            modalType: '',
            literatureImage: '',
            literatureDocument: '',
            literatureImageError: false,
            literatureDocumentError: false,
            isFileUploading: false,
            literautureList: []
        };
    }

    componentDidMount() {
        const { getLiteratures } = this.props;
        getLiteratures();
    }

    componentDidUpdate(oldProps) {
        const { literatures } = this.props;
       if (oldProps.literatures !== literatures) {
        this.setState({ literautureList: literatures });
        }
    }

    handleModal = (values, type) => {
        this.setState({ open: !this.state.open, modalType: type });
        if (!this.state.open) {
            if (values && 'literatureID' in values) {
                this.props.editRep(values);
            } else {
                this.props.editRep({
                    literatureName: ''
                })
            }
        }
    }

    handleDelete = values => {
        const { getLiteratures, deleteLiteratures } = this.props;
        deleteLiteratures(values.literatureID)
            .then(() => {
                message.success('Promotional Literature Deleted', 5);
                getLiteratures();
            })
            .catch(err => message.error(err.payload.message, 5));
    }

    handleSave = (e, form) => {
        e.preventDefault();
        if (!this.state.literatureImage&&!this.props.rep.literatureID) {
            this.setState({
                literatureImageError: true
            }); return;
        }
        if (!this.state.literatureDocument&&!this.props.rep.literatureID) {
            this.setState({
                literatureDocumentError: true
            }); return;
        }
        form.validateFields((err, values) => {
            if (!err) {
                const { getLiteratures, saveLiteratures, updateLiteratures } = this.props;
                values.literatureImage = this.state.literatureImage
                values.literatureDocumentLink = this.state.literatureDocument
                values.sort = this.props.literatures.length + 1
                this.handleModal();
                const id = this.props.rep.literatureID;
                if (!id) {
                   
                    saveLiteratures(values)
                        .then(() => {
                            this.setState({ literatureImage: '' })
                            this.setState({ literatureDocument: '' })
                            message.success('Literature is Added', 5);
                            getLiteratures();
                        })
                } else {
                 
                    values.literatureID = id;
                    updateLiteratures(values)
                        .then(() => {
                            this.setState({ literatureImage: '' })
                            this.setState({ literatureDocument: '' })
                            message.success('Literature is Updated', 5);
                            getLiteratures();
                        })
                }
            }
        });
    }

    handleUploadStart = () => {
        this.props.startLoading();
        this.setState({
            isFileUploading: true
        })
    }

    handleUploadSuccess = (filename, name) => {
        if (name.metadata_.contentType === 'application/pdf') {
            message.success('PDF Uploaded Successfully!', 5);
            this.setState({ literatureDocument: filename, literatureDocumentError: false });
        } else {
            message.success('Image Uploaded Successfully!', 5);
            this.setState({ literatureImage: filename, literatureImageError: false });
        }
        this.props.stopLoading();
        this.setState({
            isFileUploading: false
        });
    }
    render() {
        // const { open } = this.state;
        const modalTitle = `${this.state.modalType} Promotional Literature`;

        return (
            <Card title='Literature' className='width-100'>
                <div className='d-flex-row justify-end'>
                    <Button icon={<PlusSquareOutlined />} onClick={() => this.handleModal(null, 'Add')}>Add Literature</Button>
                </div>
                <List
                    literatures={this.state.literautureList}
                    loading={this.props.loading}
                    handleModal={this.handleModal}
                    handleDelete={this.handleDelete}
                    getLiteratures={this.props.getLiteratures}
                    updateLiteraturesSort={this.props.updateLiteraturesSort}
                />
                <Modal title={modalTitle} visible={this.state.open} footer={null} onCancel={this.handleModal} destroyOnClose={true}>
                    <LiteratureForm
                        handleSave={this.handleSave}
                        handleUploadStart={this.handleUploadStart}
                        handleUploadSuccess={this.handleUploadSuccess}
                        loading={this.props.loading}
                        rep={this.props.rep}
                        imageError={this.state.literatureImageError}
                        documentError={this.state.literatureDocumentError}
                        isUploading={this.state.isFileUploading}
                        formType={this.state.modalType}
                    />
                </Modal>
            </Card>
        );
    }
}

export { Literature };
