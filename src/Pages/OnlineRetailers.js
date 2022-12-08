import React, { Component } from "react";
import { PlusSquareOutlined } from '@ant-design/icons';
import { Card, Button, message } from "antd";
import { IMModal } from "../Common/Modal";
import { OnlineList } from "../Components/StoreLocator/OnlineList";
import { OnlineRetailerForm } from "../Components/StoreLocator/OnlineRetailerForm";

class OnlineRetailers extends Component {
	constructor() {
		super();

		this.state = {
			open: false,
		};
	}

	componentDidMount() {
		const { getOnlineRetailers } = this.props;

		getOnlineRetailers();
	}

	handleModal = (values) => {
		this.setState({ open: !this.state.open });
		if (!this.state.open) {
			if (values && "storeLocatorID" in values) {
				this.props.editRep(values);
			} else {
				this.props.editRep({
					name: '',
          onlineStore: 'Y',
          link: ''
				});
			}
		}
	};

	handleDelete = (values) => {
		const { getOnlineRetailers, deleteStoreLocators } = this.props;
		deleteStoreLocators(values.storeLocatorID)
			.then(() => {
				message.success("Store Locator Deleted", 5);
				getOnlineRetailers();
			})
			.catch((err) => message.error(err.payload.message, 5));
	};

	handleSave = (e, form) => {
		form.validateFields((err, values) => {
			if (!err) {
				const {
					getOnlineRetailers,
					saveStoreLocators,
					updateStoreLocators,
				} = this.props;
				this.handleModal();
				const id = this.props.onlineStores.storeLocatorID;
				if (!id) {
          values.onlineStore = 'Y';
					saveStoreLocators(values).then(() => {
						message.success("Store Locator is Added", 5);
						getOnlineRetailers();
					});
				} else {
					values.storeLocatorID = id;
					updateStoreLocators(values).then(() => {
						message.success("Store Locator is Updated", 5);
						getOnlineRetailers();
					});
				}
			}
		});
	};

	render() {
		const { open } = this.state;

		return (
            <Card title="Store Locator" className="width-100">
				<div className="d-flex-row justify-end">
					<Button icon={<PlusSquareOutlined />} onClick={this.handleModal}>
						Add Online Retailer
					</Button>
				</div>
				<OnlineList
					onlineStores={this.props.onlineStores}
					loading={this.props.loading}
					handleModal={this.handleModal}
					handleDelete={this.handleDelete}
				/>
				<IMModal
					title="Store Locator"
					open={open}
					Component={OnlineRetailerForm}
					handleModal={this.handleModal}
					handleSave={this.handleSave}
					loading={this.props.loading}
					rep={this.props.onlineStores}
				/>
			</Card>
        );
	}
}

export { OnlineRetailers };
