import React, { Component } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Card, Button, message } from 'antd';
import { IMModal } from '../Common/Modal';
import { List } from '../Components/Contacts/List';
import { ContactsForm } from '../Components/Contacts/ContactsForm';

class Contacts extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      rep: {
        department: '',
        email: ''
      }
    };
  }

  componentDidMount() {
    const { getContacts } = this.props;

    getContacts();
  }

  handleEdit = async (params) => {
    await this.setState({ rep: params });
    this.handleModal();
  }

  handleModal = () => {
    this.setState({ open: !this.state.open });
  }

  handleSave = (e, form) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        const { getContacts, createContact, updateContact } = this.props;
        const { rep: { id } } = this.state;
        this.handleModal();
        try {
          if (id) {
            await updateContact({ ...values, id })
            message.success('Contact is Updated', 5);
          } else {
            await createContact(values);
            message.success('Contact is Added', 5);
          }
          this.setState({ rep: {
            department: '',
            email: ''
          }})
          getContacts();
        } catch(e) {
          message.success('Error!!!', 5);
        }
      }
    });
  }

  render() {
    const { open } = this.state;

    return (
      <Card title='CONTACTS' className='width-100'>
        <div className='d-flex-row justify-end'>
          <Button icon={<PlusSquareOutlined />} onClick={this.handleModal}>Add Contact</Button>
        </div>
        <List contacts={this.props.contacts} loading={this.props.loading} handleEdit={this.handleEdit} />
        { open &&
          <IMModal
            title='Contacts'
            open={open}
            Component={ContactsForm}
            handleModal={this.handleModal}
            handleSave={this.handleSave}
            rep={this.state.rep}
            loading={this.props.loading}
          />
        }
      </Card>
    );
  }
}

export { Contacts };
