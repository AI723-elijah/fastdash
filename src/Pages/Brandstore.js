import React, { Component } from 'react'
import { PlusSquareOutlined } from '@ant-design/icons';
import { Card, Button, message } from 'antd'
import { IMModal } from '../Common/Modal'
import { List } from '../Components/Brandstore/List'
import { ItemForm } from '../Components/Brandstore/ItemForm'

class Brandstore extends Component {
	constructor() {
		super()

		this.state = {
			open: false,
			description: '',
			image: ''
		}
	}

	componentDidMount() {
		const { viewItems } = this.props;
		viewItems();

		if (!this.state.open) {
			this.props.editItem({
				name: '',
				  sort: 0,
				description: ''
			})
		}
	}

	handleModal = (values) => {
		this.setState({ open: !this.state.open })
		if (!this.state.open) {
			if (values && 'itemID' in values) {
				this.props.editItem(values)
				this.setState({ description: values.description });
			} else {
				this.props.editItem({
					name: '',
          			sort: 0,
					description: ''
				})
			}
		}
	}

	handleDelete = (values) => {
		const { viewItems, deleteItem } = this.props
		deleteItem(values.itemID)
			.then(() => {
				message.success('Item is Deleted', 5)
				viewItems()
			})
			.catch((err) => message.error(err.payload.message, 5))
	}

	handleSave = (e, form) => {
		e.preventDefault()
		form.validateFields((err, values) => {
			if (!err) {
				const { viewItems, createItem, updateItem } = this.props
				values.image = this.state.image || this.props.items.image
				values.description = this.state.description
				this.handleModal()
				const id = this.props.item.itemID
				if (!id) {
					createItem(values).then(() => {
						message.success('Item is Added', 5)
						viewItems()
					})
				} else {
					values.itemID = id
					updateItem(values).then(() => {
						message.success('Item is Updated', 5)
						viewItems()
					})
				}
			}
		})
	}

	handleUploadStart = () => {
		this.props.startLoading()
	}

	handleUploadSuccess = (filename, name) => {
		message.success('Image Uploaded Successfully!', 5)
		this.setState({ image: filename })
		this.props.stopLoading()
	}

	handleDesc = e => {
		this.setState({ description: e })
}

	render() {
		const { open } = this.state

		return (
            <Card title='Brand Store' className='width-100'>
				<div className='d-flex-row justify-end'>
					<Button icon={<PlusSquareOutlined />} onClick={this.handleModal}>
						Add Item
					</Button>
				</div>
				<List
					items={this.props.items}
					loading={this.props.loading}
					handleModal={this.handleModal}
					handleDelete={this.handleDelete}
				/>
				{open && <IMModal
					title='Store Item'
					open={open}
					Component={ItemForm}
					handleModal={this.handleModal}
					handleSave={this.handleSave}
					handleUploadStart={this.handleUploadStart}
					handleUploadSuccess={this.handleUploadSuccess}
					loading={this.props.loading}
					rep={this.props.item}
					desc={this.state.description}
					handleDesc={this.handleDesc}
				/>}
			</Card>
        );
	}
}

export { Brandstore }
