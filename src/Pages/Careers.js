import React, { Component } from 'react';
import { IMModal } from '../Common/Modal';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Card, Button, message } from 'antd';
import { List } from '../Components/Careers/List';
import { CareerForm } from '../Components/Careers/CareerForm';
class Careers extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            desc: ''
        };
    }

    componentDidMount() {
        const { getCareers } = this.props;
        getCareers();
    }

    handleModal = (values) => {
        this.setState({ open: !this.state.open });
        if (!this.state.open) {
            if (values && 'careerID' in values) {
                this.props.editRep(values);
                this.setState({ desc: values.description });
            } else {
                this.props.editRep({
                    title: '',
                    description: '',
                    location: ''
                })
            }
        } else {
            this.props.editRep({
                title: '',
                description: '',
                location: ''
            })
        }
    }

    handleDelete = values => {
        const { getCareers, deleteCareer } = this.props;
        deleteCareer(values.careerID)
            .then(() => {
                message.success('Career Deleted', 5);
                getCareers();
            })
            .catch(err => message.error(err.payload.message, 5));
    }

    handleSave = (e, form) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                const { getCareers, saveCareer, updateCareer } = this.props;
                values.description = this.state.desc;
                this.handleModal();
                const id = this.props.rep.careerID;
                if (!id) {
                    saveCareer(values)
                        .then(() => {
                            message.success('Career is Added', 5);
                            getCareers();
                        })
                } else {
                    values.careerID = id;
                    updateCareer(values)
                        .then(() => {
                            message.success('Career is Updated', 5);
                            getCareers();
                        })
                }
            }
        });
    }

    handleDesc = e => {
        this.setState({ desc: e })
    }

    render() {
        const { open } = this.state;
        return (
            <Card title='Careers' className='width-100'>
                <div className='d-flex-row justify-end'>
                    <Button icon={<PlusSquareOutlined />} onClick={this.handleModal}>Add Career</Button>
                </div>
                <List careers={this.props.careers} loading={this.props.loading} handleModal={this.handleModal} handleDelete={this.handleDelete} />
                <IMModal
                    title='Careers'
                    open={open}
                    Component={CareerForm}
                    handleModal={this.handleModal}
                    handleSave={this.handleSave}
                    loading={this.props.loading}
                    rep={this.props.rep}
                    desc={this.state.desc}
                    handleDesc={this.handleDesc}
                />
            </Card>
        );
    }
}

export { Careers };
