import React, { Component } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Card, Button, message } from 'antd';
import { IMModal } from '../Common/Modal';
import { List } from '../Components/Slider/List';
import { SliderForm } from '../Components/Slider/SliderForm';

class Slider extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      image: ''
    };
  }

  async componentDidMount() {
    const { getSliders } = this.props;

    getSliders();
  }

  handleModal = values => {
    this.setState({ open: !this.state.open });
    if (typeof values !== 'object') {
      this.props.editRep(values);
    } else {
      this.props.editRep(undefined);
    }
  }

  handleDelete = id => {
    const { deleteSlider, getSliders } = this.props;
    deleteSlider(id)
      .then(() => {
        message.success('Slider Deleted', 5);
        getSliders();
      })
      .catch(err => message.error(err.payload.message, 5));
  }

  handleSave = e => {
    e.preventDefault();
    const { saveSlider, getSliders, updateSlider } = this.props;
    const { image } = this.state;
    if (image) {
      const data = { image };
      const id = this.props.rep;
      if (id) {
        data.sliderID = id;
        updateSlider(data)
          .then(() => {
            this.handleModal();
            message.success('Slider Updated', 5);
            getSliders();
          })
          .catch(err => message.error(err.payload.message, 5));
      }
      else {
        saveSlider(data)
          .then(() => {
            this.handleModal();
            message.success('New Slider Image Added', 5);
            getSliders();
          })
          .catch(err => message.error(err.payload.message, 5));
      }
    } else {
      message.error('Please upload an image first', 5);
    }
  }

  handleUploadStart = () => {
    this.props.startLoading();
  }

  handleUploadSuccess = filename => {
    message.success('Image Uploaded Successfully!', 5);
    this.props.stopLoading();
    this.setState({ image: filename });
  }

  render() {
    const { open } = this.state;

    return (
      <Card title='SLIDER IMAGES' className='width-100 slider-list'>
        <div className='d-flex-row justify-end'>
          <Button icon={<PlusSquareOutlined />} onClick={this.handleModal}>Add Slider</Button>
        </div>
        <List sliders={this.props.sliders} loading={this.props.loading} handleModal={this.handleModal} handleDelete={this.handleDelete} />
        <IMModal
          title='Slider'
          open={open}
          handleModal={this.handleModal}
          handleSave={this.handleSave}
          Component={SliderForm}
          handleUploadStart={this.handleUploadStart}
          handleUploadSuccess={this.handleUploadSuccess}
          channels={this.props.channels}
          loading={this.props.loading}
        />
      </Card>
    );
  }
}

export { Slider };
