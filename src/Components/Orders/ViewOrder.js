import React, { Component } from "react";
import {
    Descriptions,
    Card,
    Typography,
    Table
} from 'antd';
import moment from 'moment'

class ViewOrder extends Component {

    columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Product ID',
            dataIndex: 'productId',
            key: 'productId',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: price => (
                <Typography>${price}</Typography>
            )
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
            title: 'Taxable',
            dataIndex: 'taxable',
            key: 'taxable',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            key: 'orderId',
        },
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: createdAt => (
                <Typography>{moment(createdAt).format('MM/DD/YYYY')}</Typography>
            )
        },
    ];
    render() {
        return (
            <Card>
                <Descriptions title="Order">
                    <Descriptions.Item label="Order ID">{this.props.order.id}</Descriptions.Item>
                    <Descriptions.Item label="Create At">{moment(this.props.order.createdAt).format('MM/DD/YYYY')}</Descriptions.Item>
                    <Descriptions.Item label="Total">${this.props.order.totalAmount}</Descriptions.Item>
                    <Descriptions.Item label="Discount">{this.props.order.discount}%</Descriptions.Item>
                    <Descriptions.Item label="Discount Total">${this.props.order.discountTotal}</Descriptions.Item>
                    <Descriptions.Item label="Cart ID">{this.props.order.cartId}</Descriptions.Item>
                    <Descriptions.Item label="User ID">{this.props.order.userId}</Descriptions.Item>
                    <Descriptions.Item label="Site ID">{this.props.order.siteId}</Descriptions.Item>
                    <Descriptions.Item label="Account ID">{this.props.order.accountId}</Descriptions.Item>
                </Descriptions>
                <Table
                    loading={this.props.loading}
                    dataSource={this.props.order.items}
                    columns={this.columns}
                    pagination={false}
                />
            </Card>
        )
    }
}

export { ViewOrder }