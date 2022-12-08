import React, { Component } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Card, Button, message } from 'antd';
import { IMModal } from '../Common/Modal';
import { List } from '../Components/Catalogs/List';
import { CatalogForm } from '../Components/Catalogs/CatalogsForm';

class Catalogs extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            catalogImage: '',
            catalogDocument: ''
        };
    }

    componentDidMount() {
        const { getCatalogs } = this.props;

        getCatalogs();
    }

    handleModal = values => {
        this.setState({ open: !this.state.open });
        if (!this.state.open) {
            if (values && 'catalogID' in values) {
                this.props.editRep(values);
            } else {
                this.props.editRep({
                    catalogName: ''
                })
            }
        }
    }

    handleDelete = values => {
        const { getCatalogs, deleteCatalogs } = this.props;
        deleteCatalogs(values.catalogID)
            .then(() => {
                message.success('Catalog Deleted', 5);
                getCatalogs();
            })
            .catch(err => message.error(err.payload.message, 5));
    }

    handleSave = (e, form) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                const { getCatalogs, saveCatalogs, updateCatalogs } = this.props;
                values.catalogImage = this.state.catalogImage
                values.catalogDocumentLink = this.state.catalogDocument
                this.handleModal();
                const id = this.props.rep.catalogID;
                if (!id) {
                    saveCatalogs(values)
                        .then(() => {
                            message.success('Catalog is Added', 5);
                            getCatalogs();
                        })
                        .catch(err => {
                            message.error(err.payload.response.data.error || "An Error Occured or Data is Missing", 5)
                        })
                } else {
                    values.catalogID = id;
                    updateCatalogs(values)
                        .then(() => {
                            message.success('Catalog is Updated', 5);
                            getCatalogs();
                        })
                }
            }
        });
    }

    handleUploadStart = () => {
        this.props.startLoading();
    }

    handleUploadSuccess = (filename, name) => {
        if (name.metadata_.contentType === 'application/pdf') {
            message.success('PDF Uploaded Successfully!', 5);
            this.setState({ catalogDocument: filename });
        } else {
            message.success('Image Uploaded Successfully!', 5);
            this.setState({ catalogImage: filename });
        }
        this.props.stopLoading();
    }
    render() {
        const { open } = this.state;

        return (
            <Card title='Catalog' className='width-100'>
                <div className='d-flex-row justify-end'>
                    <Button icon={<PlusSquareOutlined />} onClick={this.handleModal}>Add Catalog</Button>
                </div>
                <List catalogs={this.props.catalogs} loading={this.props.loading} handleModal={this.handleModal} handleDelete={this.handleDelete} />
                {open && <IMModal
                    title='Catalog'
                    open={open}
                    Component={CatalogForm}
                    handleModal={this.handleModal}
                    handleSave={this.handleSave}
                    handleUploadStart={this.handleUploadStart}
                    handleUploadSuccess={this.handleUploadSuccess}
                    loading={this.props.loading}
                    rep={this.props.rep}
                />}
            </Card>
        );
    }
}

export { Catalogs };
