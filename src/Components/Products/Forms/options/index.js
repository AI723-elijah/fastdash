import React, { Component } from "react";
import { DeleteOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Card, Button, Row, Col, Select, Modal } from "antd";
import { optionURL } from "../../../../Common/createOptionURL";
const { Item } = Form;
const { Option } = Select;

class Options extends Component {
	state = {
		modalOpen: false,
	};

	componentDidMount() {
		const { getOptions } = this.props;
		getOptions();
	}

	handleOption = (e, i) => {
		const { options, handleStateChange } = this.props;
		debugger
		const c = options.find((icon) => icon.productID === e);
		let productOptions = [...this.props.productOptions];
		productOptions[i].optionID = c.productID;
		productOptions[i].optionDetails = c;
		handleStateChange(productOptions, "productOptions");
	};

	handleDelete = (i) => {
		this.setState({ modalOpen: true, selectedOption: i });
	};

	deleteOption = () => {
		this.setState({ modalOpen: false }, () => {
			const {
				productOptions,
				handleStateChange,
				removeParentOption,
			} = this.props;
			let updatedOptions = productOptions.filter(
				(option) =>
					option.productOptionID !== this.state.selectedOption.productOptionID
			);
			removeParentOption(this.state.selectedOption.productOptionID);
			handleStateChange(updatedOptions, "productOptions");
		});
	};

	render() {
		const {
			options,
			productOptions,
			handleAddToArray,
			form: { getFieldDecorator },
		} = this.props;
		const option = {
			optionID: "",
			optionDetails: {
				name: "",
				description: "",
			},
		};

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
            <div className="mx-15 d-flex-row justify-end">
                <Button onClick={() => handleAddToArray("productOptions", option)}>
                    Add Option
                </Button>
            </div>
            <Row className="my-10" gutter={16}>
                {productOptions.map((e, i) => {
                    let src = "";
                    if (e.optionDetails.images && e.optionDetails.images.length > 0) {
                        src = optionURL(e.optionDetails.images[0].image);
                    }
                    return (
                        <Col key={i} xs={24}>
                            <Card
                                hoverable
                                className="my-10"
                                extra={
                                    <DeleteOutlined onClick={() => this.handleDelete(e)} />
                                }
                                title={e.optionDetails.name.toUpperCase()}
                            >
                                <Row>
                                    <Col className="center" md={6} xs={24}>
                                        <img src={src} className="option-img" alt={e.optionDetails.name}/>
                                    </Col>
                                    <Col md={18} xs={24}>
                                        <label>Select Option</label>
                                        <Item>
                                            {getFieldDecorator(`icon${i + 1}`, {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: "Please select Option!",
                                                    },
                                                ],
                                                setFieldsValue: e.optionDetails.name,
                                                initialValue: e.optionDetails.name,
                                            })(
                                                <Select
                                                    className="width-100"
                                                    showSearch
                                                    onChange={(e) => this.handleOption(e, i)}
                                                    optionFilterProp="children"
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
                                            )}
                                        </Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </>;
	}
}

let OptionsTab = Form.create()(Options);
export { OptionsTab };
