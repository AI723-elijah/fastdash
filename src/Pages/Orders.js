import React, { Component } from 'react';
import { DeleteOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { Card, Input, Divider, Table, Button, Drawer, Typography, Popconfirm } from 'antd';
import moment from 'moment'

import { ViewOrder } from './../Components/Orders/ViewOrder'

import './Styles/Orders.scss'

class Orders extends Component {

    constructor() {
        super();

        this.state = {
            title: 'ORDERS',
            query: '',
            drawer: false,
            page: 1,
            limit: 20,
            order: {}
        }
    }

    popupText = 'Are you sure you want to delete the order?'

    componentDidMount = () => {
        this.props.getOrders(this.props.page, this.props.limit)
    }

    columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: createdAt => (
                <Typography>{moment(createdAt).format('MM/DD/YYYY')}</Typography>
            )
        },
        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'Total',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
        },
        {
            title: 'Discount Total',
            dataIndex: 'discountTotal',
            key: 'discountTotal',
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            render: discount => (
                <Typography>{discount}%</Typography>
            )
        },
        {
            title: 'action',
            key: 'action',
            render: (record) => (
                <div>
                    <Button className='mr5' onClick={() => this.openDrawer(record)}>
                        <EyeOutlined />
                    </Button>
                    <Popconfirm placement="topRight" title={this.popupText} onConfirm={() => this.deleteOrder(record.id)} okText="Yes" cancelText="No">
                        <Button className='mr5'>
                            <DeleteOutlined />
                        </Button>
                    </Popconfirm>
                </div>
            )

        }
    ];

    handleInput = (e) => {
        this.setState({ query: e.target.value })
    }

    handlePagination = (page, pageSize) => {
        this.setState({ page, limit: pageSize })
        this.props.getOrders(page, pageSize, this.state.query)
    }

    onClose = () => {
        this.setState({ drawer: false })
    }

    openDrawer = (record) => {
        this.setState({ drawer: true, order: record })
    }

    search = () => {
        this.props.getOrders(1, this.state.limit, this.state.query)
    }

    deleteOrder = (id) => {
        this.props.deleteOrder(id)
    }

    render() {
        return (
            <Card title={this.state.title} className='width-100 products-list'>
                <Drawer width='90%' title="View Order" placement="right" onClose={this.onClose} visible={this.state.drawer}>
                    <ViewOrder order={this.state.order} />
                </Drawer>
                <Input
                    className='search-box'
                    placeholder='Search Orders'
                    onChange={this.handleInput}
                    value={this.state.query}
                    addonAfter={<SearchOutlined onClick={this.search} />}
                />
                <Divider />
                <Table
                    loading={this.props.loading}
                    dataSource={this.props.orders}
                    columns={this.columns}
                    pagination={{ 
                        onChange: this.handlePagination, 
                        total: this.props.count, 
                        defaultPageSize: 20, 
                        showSizeChanger: true, 
                        pageSizeOptions: ['20', '50', '100'] 
                    }}
                />
            </Card>
        );
    }
}

export { Orders }