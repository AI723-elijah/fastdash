import React, { Component } from "react";
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Card, Button, Row, Col, Select, Modal, Spin } from "antd";


const { Option } = Select;
const { Item } = Form;

class Accessories extends Component {
	state = {
		modalOpen: false,
		products:[]
	};

	addIcon = () => {
		const { parentIndex, handleStateChange } = this.props;
		let variation = { ...this.props.productRelation };
		let variations = [...this.props.productRelations];
		const option = {
			childID: "",
			parentID: "",
			accessoryDetails: {
				sku: "",
			},
		};
		variation.childProductDetails.productAccessories.push(option);
		variations[parentIndex].childProductDetails = variation.childProductDetails;
		handleStateChange(variations, "productRelations");
	};

	handleDelete = (i) => {
		this.setState({ modalOpen: true, selectedOption: i });
	};

	handleChange = (v, i) => {
		const { handleStateChange, parentIndex } = this.props;
		const { products } = this.state;

		let productRelations = [...this.props.productRelations];
		const option = products.find((e) => e.productID === v);
		debugger

		productRelations[parentIndex].childProductDetails.productAccessories[
			i
		].childID = v;
		productRelations[parentIndex].childProductDetails.productAccessories[
			i
		].accessoryDetails.name = option.name;
		productRelations[parentIndex].childProductDetails.productAccessories[
			i
		].accessoryDetails.description = option.description;
		productRelations[parentIndex].childProductDetails.productAccessories[
			i
		].accessoryDetails.images = option.images;
		handleStateChange(productRelations, "productRelations");
	};

	deleteOption = () => {
		this.setState({ modalOpen: false }, () => {
			const { handleStateChange, parentIndex, deleteAccessory } = this.props;
			let productRelations = [...this.props.productRelations];
			productRelations[
				parentIndex
			].childProductDetails.productAccessories = productRelations[
				parentIndex
			].childProductDetails.productAccessories.filter(
				(item) =>
					item.id !== this.state.selectedOption.id
			);
			handleStateChange(productRelations, "productRelations");
			deleteAccessory(this.state.selectedOption.id);
		});
	};
	handleSearch = async (e) => {
		this.setState({ loading: true });
		const res = await this.props.searchVariations(e);
		this.setState({ loading: false, products: res.payload.rows });
	}

	render() {
		const { productRelation,form: { getFieldDecorator } } = this.props;
		const {products}=this.state
		return <>
            <Modal
                title="Delete Accessory"
                visible={this.state.modalOpen}
                onOk={this.deleteOption}
                onCancel={() => {
                    this.setState({ modalOpen: false });
                }}
            >
                <h3>Are you sure you want to delete this acessory? </h3>
                <p>Note: This will delete this acessory but you can still link again</p>
            </Modal>
            <Card
                title="Variation Accessories"
                type="inner"
                extra={
                    <Button icon={<PlusOutlined />} type="primary" onClick={this.addIcon}>
                        Add Accessory
                    </Button>
                }
            >
                <Row className="variation-row" gutter={16}>
                    {productRelation.childProductDetails.productAccessories &&
                        productRelation.childProductDetails.productAccessories.map((p, i) => {
                        
                            return (
                                <Col
                                    className="my-10 "
                                    key={i}
                                    xs={24}
                                    sm={12}
                                    md={8}
                                    style={{ position: "relative" }}
                                >
                                    <DeleteOutlined
                                        style={{
                                            position: "absolute",
                                            right: "0",
                                            top: "0",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => this.handleDelete(p)} />
                                
                                    <label>Search For Accessory</label>
                                    <Item>
                                            {getFieldDecorator(`accessories${i + 1}`, {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "Please select Accessory!",
                                                    },
                                                ],
                                                setFieldsValue: p.accessoryDetails ? p.accessoryDetails.sku || '' : '',
                                                initialValue: p.accessoryDetails ? p.accessoryDetails.sku || '' : '',
                                            })(
                                    <Select
                                        className='width-100'
                                        size='large'
                                        showSearch
                                        defaultActiveFirstOption={false}
                                        showArrow={true}
                                        filterOption={false}
                                        notFoundContent={this.state.loading ? <Spin size='small' /> : null}
                                        onSearch={this.handleSearch}
                                        value={p.childID}
                                        onChange={(e) => this.handleChange(e, i)}
                                    >
                                        {products.length &&
                                            products.map((c) => {
                                                return (
                                                    <Option key={c.productID} value={c.productID}>
                                                        {c.sku}
                                                    </Option>
                                                );
                                            })}
                                    </Select>	)}
                                        </Item>
                                </Col>
                            );
                        })}
                </Row>
            </Card>
        </>;
	}
}

export { Accessories };
