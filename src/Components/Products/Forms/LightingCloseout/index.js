import React from 'react';
import { connect } from 'react-redux';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Card, Row, Col, Input } from 'antd';
const { Item } = Form;

const LightingCloseout = (props) => {

    const { form: { getFieldDecorator }, handleChange } = props

    return (
        <Card hoverable>
            <Row gutter={16}>
                <Col sm={12}>
                    <label>Item Name</label>
                    <Item>
                        {getFieldDecorator('itemname', {
                            rules: [
                                { required: true, message: 'Item Name' },
                            ],
                            setFieldsValue: '',
                            initialValue: ''
                        })(
                            <Input
                                name='itemname'
                                onChange={(e) => handleChange(e, 'itemname')}
                            />
                        )}
                    </Item>
                </Col>
                <Col sm={12}>
                    <label>Item Number</label>
                    <Item>
                        {getFieldDecorator('itemname', {
                            rules: [
                                { required: true, message: 'Item Name' },
                            ],
                            setFieldsValue: '',
                            initialValue: ''
                        })(
                            <Input
                                name='itemname'
                                onChange={(e) => handleChange(e, 'itemname')}
                            />
                        )}
                    </Item>
                </Col>
                <Col sm={12}>
                    <label>Description</label>
                    <Item>
                        {getFieldDecorator('itemname', {
                            rules: [
                                { required: true, message: 'Item Name' },
                            ],
                            setFieldsValue: '',
                            initialValue: ''
                        })(
                            <Input
                                name='itemname'
                                onChange={(e) => handleChange(e, 'itemname')}
                            />
                        )}
                    </Item>
                </Col>
                <Col sm={12}>
                    <label>Closeout Deal Description</label>
                    <Item>
                        {getFieldDecorator('itemname', {
                            rules: [
                                { required: true, message: 'Item Name' },
                            ],
                            setFieldsValue: '',
                            initialValue: ''
                        })(
                            <Input
                                name='itemname'
                                onChange={(e) => handleChange(e, 'itemname')}
                            />
                        )}
                    </Item>
                </Col>
                <Col sm={12}>
                    <label>Quantity of product in this deal</label>
                    <Item>
                        {getFieldDecorator('itemname', {
                            rules: [
                                { required: true, message: 'Item Name' },
                            ],
                            setFieldsValue: '',
                            initialValue: ''
                        })(
                            <Input
                                name='itemname'
                                onChange={(e) => handleChange(e, 'itemname')}
                            />
                        )}
                    </Item>
                </Col>
                <Col sm={12}>
                    <label>Quantity Included</label>
                    <Item>
                        {getFieldDecorator('itemname', {
                            rules: [
                                { required: true, message: 'Item Name' },
                            ],
                            setFieldsValue: '',
                            initialValue: ''
                        })(
                            <Input
                                name='itemname'
                                onChange={(e) => handleChange(e, 'itemname')}
                            />
                        )}
                    </Item>
                </Col>
                <Col sm={12}>
                    <label>Quantity Available</label>
                    <Item>
                        {getFieldDecorator('itemname', {
                            rules: [
                                { required: true, message: 'Item Name' },
                            ],
                            setFieldsValue: '',
                            initialValue: ''
                        })(
                            <Input
                                name='itemname'
                                onChange={(e) => handleChange(e, 'itemname')}
                            />
                        )}
                    </Item>
                </Col>
                <Col sm={12}>
                    <label>Regular Price</label>
                    <Item>
                        {getFieldDecorator('itemname', {
                            rules: [
                                { required: true, message: 'Item Name' },
                            ],
                            setFieldsValue: '',
                            initialValue: ''
                        })(
                            <Input
                                name='itemname'
                                onChange={(e) => handleChange(e, 'itemname')}
                            />
                        )}
                    </Item>
                </Col>
            </Row>
            <Col sm={12}>
                <label>Closeout Price</label>
                <Item>
                    {getFieldDecorator('itemname', {
                        rules: [
                            { required: true, message: 'Item Name' },
                        ],
                        setFieldsValue: '',
                        initialValue: ''
                    })(
                        <Input
                            name='itemname'
                            onChange={(e) => handleChange(e, 'itemname')}
                        />
                    )}
                </Item>
            </Col>
        </Card>
    )
}

let LightingCloseoutTab = Form.create()(LightingCloseout);

const mapStateToProps = state => {
    return {
        products: state.productReducer,
        productCategories: state.productReducer.productCategories,
        inventoryItems: state.portalReducer.inventoryItems
    }
}

LightingCloseoutTab = connect(mapStateToProps)(LightingCloseoutTab)

export { LightingCloseoutTab }