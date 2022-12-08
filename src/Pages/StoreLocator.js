import React, { Component } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Card, Button, message } from 'antd';
import { IMModal } from '../Common/Modal';
import { List } from '../Components/StoreLocator/List';
import { StoreLocatorForm } from '../Components/StoreLocator/StoreLocatorForm';

class StoreLocator extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
        };
    }

    componentDidMount() {
        const { getStoreLocators } = this.props;

        getStoreLocators();
    }

    handleModal = values => {
        this.setState({ open: !this.state.open });
        if (!this.state.open) {
            if (values && 'storeLocatorID' in values) {
                this.props.editRep(values);
            } else {
                this.props.editRep({
                    name: '',
                    address: '',
                    city: '',
                    state: '',
                    zip: '',
                    hours: '',
                    categories: '',
                    additionalInfo: '',
                    long: '',
                    lat: '',
                    phone: '',
                    fax: '',
                })
            }
        }
    }

    handleDelete = values => {
        const { getStoreLocators, deleteStoreLocators } = this.props;
        deleteStoreLocators(values.storeLocatorID)
            .then(() => {
                message.success('Store Locator Deleted', 5);
                getStoreLocators();
            })
            .catch(err => message.error(err.payload.message, 5));
    }

    handleSave = (e, form) => {
      
        form.validateFields((err, values) => {
            if (!err) {
                const { getStoreLocators, saveStoreLocators, updateStoreLocators } = this.props;
                this.handleModal();
                const id = this.props.rep.storeLocatorID;
                if (!id) {
                    saveStoreLocators(values)
                    .then(() => {
                        message.success('Store Locator is Added', 5);
                        getStoreLocators();
                    })
                } else {
                    values.storeLocatorID = id;
                    updateStoreLocators(values)
                        .then(() => {
                            message.success('Store Locator is Updated', 5);
                            getStoreLocators();
                        })
                }
            }
        });
    }

    render() {
        const { open } = this.state;

        return (
            <Card title='Store Locator' className='width-100'>
                <div className='d-flex-row justify-end'>
                    <Button icon={<PlusSquareOutlined />} onClick={this.handleModal}>Add Store Locator</Button>
                </div>
                <List storeLocators={this.props.storeLocators} loading={this.props.loading} handleModal={this.handleModal} handleDelete={this.handleDelete} />
                {open && <IMModal
                    title='Store Locator'
                    open={open}
                    Component={StoreLocatorForm}
                    handleModal={this.handleModal}
                    handleSave={this.handleSave}
                    loading={this.props.loading}
                    rep={this.props.rep}
                />}
            </Card>
        );
    }
}

export { StoreLocator };
