import React, { Component } from 'react'
import { PlusSquareOutlined } from '@ant-design/icons';
import { Card, Button, message } from 'antd'
import { IMModal } from '../Common/Modal'
import { List } from '../Components/Services/List'
import { ServicesForm } from '../Components/Services/ServicesForm'

class Services extends Component {
	constructor() {
		super()

		this.state = {
			open: false,
			image: '',
			description: ''
		}
	}

	componentDidMount() {
		const { getServices } = this.props;

		getServices();
	}

	handleModal = (values) => {
		this.setState({ open: !this.state.open })
		if (!this.state.open) {
			if (values && 'serviceID' in values) {
				this.props.editService(values)
				this.setState({ description: values.description, image: values.image })
			} else {
				this.setState({ image: '', description: '' })
				this.props.editService({
					title: '',
					description: '',
          sort: 0
				})
			}
		}
	}

	handleDelete = (values) => {
		const { getServices, deleteService } = this.props
		deleteService(values.serviceID)
			.then(() => {
				message.success('Service is Deleted', 5)
				getServices()
			})
			.catch((err) => message.error(err.payload.message, 5))
	}

	handleSave = (e, form) => {
		e.preventDefault()
		form.validateFields((err, values) => {
			if (!err) {
				const { getServices, createService, updateService } = this.props
				values.image = this.state.image
				values.description = this.state.description
				this.handleModal()
				const id = this.props.service.serviceID
				if (!id) {
					createService(values).then(() => {
						message.success('Service is Added', 5)
						getServices()
					})
				} else {
					values.serviceID = id
					updateService(values).then(() => {
						message.success('Service is Updated', 5)
						getServices()
					})
				}
			}
		})
	}

	handleDesc = (e) => {
		this.setState({ description: e })
	}

	handleUploadStart = () => {
		this.props.startLoading()
	}

	handleUploadSuccess = (filename, name) => {
		message.success('Image Uploaded Successfully!', 5)
		this.setState({ image: filename })
		this.props.stopLoading()
	}

	render() {
		const { open } = this.state

		return (
            <Card title='Services' className='width-100'>
				<div className='d-flex-row justify-end'>
					<Button icon={<PlusSquareOutlined />} onClick={this.handleModal}>
						Add Service
					</Button>
				</div>
				<List
					services={this.props.services}
					loading={this.props.loading}
					handleModal={this.handleModal}
					handleDelete={this.handleDelete}
				/>
				{ open &&
					<IMModal
						title='Manufacturing Services'
						open={open}
						Component={ServicesForm}
						handleModal={this.handleModal}
						handleSave={this.handleSave}
						handleUploadStart={this.handleUploadStart}
						handleUploadSuccess={this.handleUploadSuccess}
						loading={this.props.loading}
						rep={this.props.service}
						desc={this.state.description}
						handleDesc={this.handleDesc}
					/>
				}
			</Card>
        );
	}
}

export { Services }
