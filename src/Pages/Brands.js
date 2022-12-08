import React, { Component } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Card, Button, message } from 'antd';
import { IMModal } from '../Common/Modal';
import { List } from '../Components/Brands/List';
import { BrandForm } from '../Components/Brands/BrandsForm';

class Brand extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            brandImage: '',
        };
    }

    componentDidMount() {
        const { getBrands } = this.props;

        getBrands();
    }

    handleDelete = id => {
        const { deleteBrand, getBrands } = this.props;
        deleteBrand(id)
        .then(() => {
          message.success('Brand Deleted', 5);
          getBrands();
        })
        .catch(err => message.error(err.payload.message, 5));
      }

    handleModal = values => {
        this.setState({ open: !this.state.open });
            if (values && 'brandID' in values) {
                this.props.editRep(values);
                this.setState({ brandImage: values.brandImage })
            } else {
                this.props.editRep({
                    link: ''
                });
            }
    }

    handleSave = (e, form) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                const { getBrands, saveBrands, updateBrand, rep } = this.props;
                values.brandImage = this.state.brandImage
                this.handleModal();
                const id = rep.brandID;
                if (id) {
                    values.brandID = id;
                    updateBrand(values)
                        .then(() => {
                            message.success('Brand Updated', 5);
                            getBrands();
                        })
                        .catch(err => message.error(err.payload.message, 5));
                } else {
                    saveBrands(values)
                        .then(() => {
                            message.success('Brand is Added', 5);
                            getBrands();
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
        this.setState({ brandImage: filename });
        this.props.stopLoading();
    }
    render() {
        const { open } = this.state;

        return (
            <Card title='Brand' className='width-100'>
                <div className='d-flex-row justify-end'>
                    <Button icon={<PlusSquareOutlined />} onClick={this.handleModal}>Add Brand</Button>
                </div>
                <List brands={this.props.brands} loading={this.props.loading} handleModal={this.handleModal} handleDelete={this.handleDelete}/>
                {open && <IMModal
                    title='Brand'
                    open={open}
                    Component={BrandForm}
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

export { Brand };
