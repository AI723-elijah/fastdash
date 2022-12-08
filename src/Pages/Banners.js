import React, { Component } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Card, Button, message } from 'antd';
import { IMModal } from '../Common/Modal';
import { List } from '../Components/Banners/List';
import { BannerForm } from '../Components/Banners/BannerForm';

class Banners extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      image: ''
    };
  }

  async componentDidMount() {
    const { getBanners } = this.props;

    getBanners();
  }

  handleModal = values => {
    this.setState({ open: !this.state.open });
    if (values && 'bannerID' in values) {
      this.props.editRep(values);
      this.setState({ image: values.image })
    } else {
      this.props.editRep({
        link: '',
        sort: ''
      });
    }
  }

  handleDelete = id => {
    const { deleteBanner, getBanners } = this.props;
    deleteBanner(id)
      .then(() => {
        message.success('Banner Deleted', 5);
        getBanners();
      })
      .catch(err => message.error(err.payload.message, 5));
  }

  handleSave = (e, form) => {
    e.preventDefault();
    const { saveBanner, getBanners, updateBanner } = this.props;
    const { image } = this.state;
    debugger
    form.validateFields((err, values) => {
      if (!err) {
        if (image) {
          const data = { ...this.props.rep, image, link: values.link, sort: values.sort };
          if (data.bannerID) {
            updateBanner(data)
              .then(() => {
                this.handleModal();
                message.success('Banner Updated', 5);
                getBanners();
              })
              .catch(err => message.error(err.payload.message, 5));
          }
          else {
            saveBanner(data)
              .then(() => {
                this.handleModal();
                message && message.success('New Banner Added', 5);
                getBanners();
              })
              .catch(err => message.error(err.payload.message, 5));
          }
        } else {
          message.error('Please upload an image first', 5);
        }
      }
    })
  }

  handleUploadStart = () => {
    this.props.startLoading();
  }

  handleUploadSuccess = filename => {
    // message.success('Image Uploaded Successfully!', 5);
    this.props.stopLoading();
    this.setState({ image: filename });
  }

  render() {
    const { open } = this.state;

    return (
      <Card title='BANNER IMAGES' className='width-100 banners-list'>
        <div className='d-flex-row justify-end'>
          <Button icon={<PlusSquareOutlined />} onClick={this.handleModal}>Add Banner</Button>
        </div>
        <List banners={this.props.banners} loading={this.props.loading} handleModal={this.handleModal} handleDelete={this.handleDelete} />
        {open && <IMModal
          title='Banner'
          open={open}
          handleModal={this.handleModal}
          handleSave={this.handleSave}
          Component={BannerForm}
          handleUploadStart={this.handleUploadStart}
          handleUploadSuccess={this.handleUploadSuccess}
          channels={this.props.channels}
          loading={this.props.loading}
          rep={this.props.rep}
        />}
      </Card>
    );
  }
}

export { Banners };
