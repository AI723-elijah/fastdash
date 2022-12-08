import React, { Component } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Card, Button, Input , message, Modal } from 'antd';
import { List } from '../Components/Coupons/List';
import { CouponForm } from '../Components/Coupons/CouponForm';

class Coupons extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            modalType: '',
            couponsList: this.props && this.props.coupons,
            websitesList: this.props && this.props.websites
        };
    }

    componentDidMount() {
        const { getCoupons, coupons, getWebsites, websites } = this.props;
        if (coupons && coupons.length === 0) {
            getCoupons();
        }
        if (websites && websites.length === 0) {
            getWebsites()
        }
    }

    componentDidUpdate(oldProps) {
        const { coupons, websites } = this.props;
            
        if(oldProps.coupons !== coupons) {
            this.setState({ couponsList: coupons });
        }

        if(oldProps.websites !== websites) {
            this.setState({ websitesList: websites });
        }

    }

    handleSearch = async (e) => {
        const { coupons } = this.props;
        var searchFilter = e.target.value && e.target.value.toLowerCase()
        let searchCoupon = [];
        
      searchCoupon = coupons && coupons.filter(item => {
        return Object.keys(item).some(key =>
          typeof item[key] === "string" && item[key] && item[key].toLowerCase().includes(searchFilter)
        );
      })
        
        if (searchCoupon) {
            this.setState({ couponsList: searchCoupon })
        }
        else {
            this.setState({ couponsList: coupons })
        }
    }

    handleModal = (values, type) => {
        this.setState({ open: !this.state.open, modalType: type });
        if (!this.state.open) {
            if (values && 'couponID' in values) {
                this.props.editRep(values);
            } else {
                this.props.editRep({
                    name: ''
                })
            }
        }
    }

    handleDelete = (values) => {
        const { deleteCoupon, getCoupons } = this.props;
        deleteCoupon(values && values.couponID)
                        .then(() => {
                            message.success('Coupon removed', 5);
                            getCoupons();
                        })
                        .catch((err) => message.error(err.payload.message, 5));
    }

    handleSave = (e, form) => {
        e.preventDefault();
        
        const { createCoupon, updateCoupon, getCoupons } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                if (this.state.modalType === 'Add Coupon') {
                    createCoupon(values)
                        .then(() => {
                            this.handleModal();
                            message.success('Added new coupon successfully', 5);
                            getCoupons();
                        })
                        .catch((err) => message.error(err.payload.message, 5));
                }
                else {
                    let payload = {
                        ...this.props.rep,
                        ...values
                    }
                    updateCoupon(payload)
                        .then(() => {
                            this.handleModal();
                            message.success('Coupon has been updated', 5);
                            getCoupons()
                        })
                        .catch((err) => message.error(err.payload.message, 5));
                }
          }
        });
      }

    render() {
        const { open, couponsList, websitesList, modalType } = this.state;
        const modalTitle = `${this.state.modalType}`;

        return (
            <Card title='Coupon' className='width-100'>
                    <div className='d-flex justify-end'>
                         <Input 
                            className='select-user mx-10'
                            placeholder='Search Coupon'
                            onChange={(e) => this.handleSearch(e)}
                        />
                            <Button icon={<PlusSquareOutlined />} onClick={() => this.handleModal(null, 'Add Coupon')}>
                                Add Coupon
                            </Button>
                    </div>
                <List
                    couponsList={couponsList}
                    loading={this.props.loading}
                    handleModal={this.handleModal}
                    handleDelete={this.handleDelete}
                />
                <Modal title={modalTitle} visible={open} footer={null} onCancel={this.handleModal} destroyOnClose={true}>
                    <CouponForm
                        handleSave={this.handleSave}
                        loading={this.props.loading}
                        couponDetail={this.props.rep}
                        websitesList={websitesList}
                        modalType={modalType}
                    />
                </Modal>
            </Card>
        );
    }
}

export { Coupons };
