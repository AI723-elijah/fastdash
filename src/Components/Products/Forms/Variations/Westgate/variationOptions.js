import React, { Component } from "react";
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Button, Row, Col, Select, Modal } from "antd";
import { optionURL } from "../../../../../Common/createOptionURL";

const { Option } = Select;

class Options extends Component {
	state = {
		modalOpen: false,
	};

	addIcon = () => {
		const { parentIndex, handleStateChange } = this.props;
		let variation = { ...this.props.productRelation };
		let variations = [...this.props.productRelations];
		const option = {
			optionID: "",
			optionDetails: {
				name: "",
				description: "",
			},
		};
		variation.childProductDetails.productOptions.push(option);
		variations[parentIndex].childProductDetails = variation.childProductDetails;
		handleStateChange(variations, "productRelations");
	};

	handleDelete = (i) => {
		this.setState({ modalOpen: true, selectedOption: i });
	};

	handleChange = (v, i) => {
		const { handleStateChange, parentIndex, options } = this.props;
		let productRelations = [...this.props.productRelations];
		const option = options.find((e) => e.productID === v);
		productRelations[parentIndex].childProductDetails.productOptions[
			i
		].optionID = v;
		productRelations[parentIndex].childProductDetails.productOptions[
			i
		].optionDetails.name = option.name;
		productRelations[parentIndex].childProductDetails.productOptions[
			i
		].optionDetails.description = option.description;
		productRelations[parentIndex].childProductDetails.productOptions[
			i
		].optionDetails.images = option.images;
		handleStateChange(productRelations, "productRelations");
	};

	deleteOption = () => {
		this.setState({ modalOpen: false }, () => {
			const { handleStateChange, parentIndex, removeParentOption } = this.props;
			let productRelations = [...this.props.productRelations];
			productRelations[
				parentIndex
			].childProductDetails.productOptions = productRelations[
				parentIndex
			].childProductDetails.productOptions.filter(
				(item) =>
					item.productOptionID !== this.state.selectedOption.productOptionID
			);
			handleStateChange(productRelations, "productRelations");
			removeParentOption(this.state.selectedOption.productOptionID);
		});
	};

	render() {
		const { productRelation, options } = this.props;
		return <>
            <Modal
                title="Delete Option"
                visible={this.state.modalOpen}
                onOk={this.deleteOption}
                onCancel={() => {
                    this.setState({ modalOpen: false });
                }}
            >
                <h3>Are you sure you want to delete this option? </h3>
                <p>Note: This will delete this option but you can still link again</p>
            </Modal>
            <Card
                title="Variation Options"
                type="inner"
                extra={
                    <Button icon={<PlusOutlined />} type="primary" onClick={this.addIcon}>
                        Add Option
                    </Button>
                }
            >
                <Row className="variation-row" gutter={16}>
                    {productRelation.childProductDetails.productOptions &&
                        productRelation.childProductDetails.productOptions.map((p, i) => {
                            let src = "";
                            if (
                                p.optionDetails.images &&
                                p.optionDetails.images.length > 0
                            ) {
                                src = optionURL(p.optionDetails.images[0].image);
                            }
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
                                    <Row>
                                        <Col className="center" md={24} xs={24}>
                                            <img
                                                src={src}
                                                className="option-img"
                                                alt="option-img"
                                            />
                                        </Col>
                                    </Row>
                                    <label>Select Option</label>
                                    <Select
                                        className="width-100"
                                        showSearch
                                        value={p.optionID}
                                        onChange={(e) => this.handleChange(e, i)}
                                    >
                                        {options &&
                                            options.map((c) => {
                                                return (
                                                    <Option key={c.productID} value={c.productID}>
                                                        {c.name}
                                                    </Option>
                                                );
                                            })}
                                    </Select>
                                </Col>
                            );
                        })}
                </Row>
            </Card>
        </>;
	}
}

export { Options };
