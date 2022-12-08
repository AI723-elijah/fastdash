import React, { useEffect } from 'react';
import {
    Spin,
    Space,
    Table,
    Card
} from 'antd';

const MissingSageProducts = (props) => {

    const fetchProducts = async () => {
        props.startLoading()
        await props.getMissingSageProducts()
        props.stopLoading()
    }

    const columns = [
        {
            title: 'ItemCode',
            dataIndex: 'ItemCode',
            key: 'ItemCode',
        },
        {
            title: 'ItemTitle',
            dataIndex: 'ItemTitle',
            key: 'ItemTitle',
        },
        {
            title: 'ItemDescription',
            dataIndex: 'ItemDescription',
            key: 'ItemDescription',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">

                </Space>
            ),
        },
    ];

    useEffect(() => {
        fetchProducts()
        // eslint-disable-next-line
    }, [])
    return (
        <Spin spinning={props.loading}>
            <Card title='Missing Sage Products' className='width-100 products-list'>
            <Table
                columns={columns}
                pagination={{ position: 'bottom' }}
                dataSource={props.missingSageProducts}
            />
            </Card>
        </Spin>
    )
}

export { MissingSageProducts }
