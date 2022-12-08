import React, { Component } from 'react';
import { PlusSquareOutlined, SearchOutlined } from '@ant-design/icons';
import { Card, Button, Input, message } from 'antd';
import { IMModal } from '../Common/Modal';
import { List } from '../Components/Suppliers/List';
import { SupplierForm } from '../Components/Suppliers/SupplierForm';

import './Styles/Suppliers.scss';

class Suppliers extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      suppliers: []
    };
  }

  async componentDidMount() {
    const { getSuppliers } = this.props;

    getSuppliers();
  }

  componentDidUpdate(oldProps) {
    let { suppliers } = this.props;

    if(suppliers !== oldProps.suppliers) {
      this.setState({ suppliers: suppliers.map(e => { return {...e, key: e.supplierID}} ) });
    }
  }

  handleModal = () => {
    this.setState({ open: !this.state.open });
  }

  handleSave = (e, form) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        this.handleModal();
        const { saveSupplier, getSuppliers } = this.props;
        saveSupplier(values)
          .then(() => {
            message.success('Supplier has been created', 5);
            getSuppliers()
          })
          .catch(err => message.error(err.payload.message, 5));
      }
    });
  }

  render() {
    const { open, suppliers } = this.state;

    return (
      <Card title='SUPPLIERS' className='width-100 suppliers-list'>
        <div className='d-flex-row justify-between'>
          <Input
            className='search-box'
            placeholder='Search Suppliers'
            onChange={e => this.props.searchSuppliers(e.target.value)}
            addonAfter={<SearchOutlined />}
          />
          <Button icon={<PlusSquareOutlined />} onClick={this.handleModal}>Add Supplier</Button>
        </div>
        <List suppliers={suppliers} loading={this.props.loading} />
        <IMModal
          open={open}
          handleModal={this.handleModal}
          handleSave={this.handleSave}
          Component={SupplierForm}
          title='Suppliers'
        />
      </Card>
    );
  }
}

export { Suppliers };
