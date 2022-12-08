import React, { Component } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Card, Button, message } from 'antd';
import { IMModal } from '../Common/Modal';
import { List } from '../Components/Icons/List';
import { IconForm } from '../Components/Icons/IconsForm';

class Icons extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      iconURL: ''
    };
  }

  componentDidMount() {
    const { getIcons } = this.props;

    getIcons();
  }

  handleModal = () => {
    this.setState({ open: !this.state.open });
  }

  handleSave = (e, form) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const { getIcons, saveIcon } = this.props;
        values.iconURL = this.state.iconURL
        this.handleModal();
        saveIcon(values)
          .then(() => {
            message.success('Icon is Added', 5);
            getIcons();
          })
      }
    });
  }

  handleUploadStart = () => {
    this.props.startLoading();
  }

  handleUploadSuccess = filename => {
    message.success('Image Uploaded Successfully!', 5);
    this.setState({ iconURL: filename });
    this.props.stopLoading();
  }

  render() {
    const { open } = this.state;

    return (
      <Card title='ICONS' className='width-100'>
        <div className='d-flex-row justify-end'>
          <Button icon={<PlusSquareOutlined />} onClick={this.handleModal}>Add Icon</Button>
        </div>
        <List icons={this.props.icons} loading={this.props.loading} updateIcon={this.props.updateIcon} getIcons={this.props.getIcons} deleteIcon={this.props.deleteIcon} updateIconSort={this.props.updateIconSort}/>
        <IMModal
          title='Icons'
          open={open}
          Component={IconForm}
          handleModal={this.handleModal}
          handleSave={this.handleSave}
          handleUploadStart={this.handleUploadStart}
          handleUploadSuccess={this.handleUploadSuccess}
          loading={this.props.loading}
        />


      </Card>
    );
  }
}

export { Icons };
