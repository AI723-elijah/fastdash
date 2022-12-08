import React, { Component } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Button, Row, Col, Select, Modal, message } from 'antd';

const { Option } = Select;

class Icons extends Component {
  state = {
    modalOpen: false,
  }
  addIcon = () => {
    const { parentIndex, handleStateChange } = this.props;
    let variation = { ...this.props.productRelation };
    let variations = [...this.props.productRelations];
    const icon = {
      dummyID: variation.childProductDetails.productIcons.length + 1,
      iconID: '',
      iconDetails: {
        iconID: '',
        iconName: '',
        iconURL: ''
      }
    }

    variation.childProductDetails.productIcons.push(icon);
    variations[parentIndex].childProductDetails = variation.childProductDetails;
    handleStateChange(variations, 'productRelations');
  }

  handleChange = (v, i) => {
    const { handleStateChange, parentIndex, icons } = this.props;
    let productRelations = [...this.props.productRelations];
    const icon = icons.find(e => e.iconID === v);

    productRelations[parentIndex].childProductDetails.productIcons[i].iconID = v;
    productRelations[parentIndex].childProductDetails.productIcons[i].iconDetails.iconID = v;
    productRelations[parentIndex].childProductDetails.productIcons[i].iconDetails.iconName = icon.iconName;
    productRelations[parentIndex].childProductDetails.productIcons[i].iconDetails.iconURL = icon.iconURL;
    handleStateChange(productRelations, 'productRelations');
  }

  handleDelete = i => {
    this.setState({ modalOpen: true, selectedIcon: i })
  }

  deleteOption = () => {
    this.setState({ modalOpen: false }, () => {
      const { handleStateChange, parentIndex, removeVariationIcon } = this.props;
      let productRelations = [...this.props.productRelations];

      if (this.state.selectedIcon.dummyID) {

        const iconsWithDummyIDs = productRelations[parentIndex].childProductDetails.productIcons.filter(item => item.dummyID);
        const iconsWithDummyIDsInState = iconsWithDummyIDs.filter(item => item.dummyID !== this.state.selectedIcon.dummyID);
        const savedIcons = productRelations[parentIndex].childProductDetails.productIcons.filter(item => !item.dummyID);
        productRelations[parentIndex].childProductDetails.productIcons = [...savedIcons, ...iconsWithDummyIDsInState];
        message.success('Icon deleted Successfully!', 5);
        handleStateChange(productRelations, 'productRelations');
      }
      else {
        productRelations[parentIndex].childProductDetails.productIcons = productRelations[parentIndex].childProductDetails.productIcons.filter(icon => icon.iconID !== this.state.selectedIcon.iconID);
        if (this.state.selectedIcon.iconID) {
          removeVariationIcon(this.state.selectedIcon.productIconID).then((del) => {
            message.success('Icon deleted Successfully!', 5);
            handleStateChange(productRelations, 'productRelations');
          }).catch((err) => {
            message.error('Something went wrong try again !', 5);
          })
        }
      }



    });
  }
  render() {
    const { productRelation, icons } = this.props;

    return <>
      <Modal
        title="Delete Option"
        visible={this.state.modalOpen}
        onOk={this.deleteOption}
        onCancel={() => { this.setState({ modalOpen: false }) }}
      >
        <h3>Are you sure you want to delete this Icon? </h3>
        <p>Note: This will delete this Icon but you can still link again</p>
      </Modal>
      <Card
        title='Variation Icons'
        type='inner'
        extra={
          <Button icon={<PlusOutlined />} type='primary' onClick={this.addIcon}>Add Icon</Button>
        }
      >
        <Row className='variation-row' gutter={16}>
          {productRelation.childProductDetails.productIcons.map((p, i) => {
            return (
              <Col className='my-10' key={i} xs={24} sm={12} md={8} >
                <DeleteOutlined
                  style={{ position: 'absolute', right: "9px", top: "0", cursor: 'pointer' }}
                  onClick={() => this.handleDelete(p)} />
                <label>Select Icon</label>
                <Select
                  className='width-100'
                  showSearch
                  value={p.iconID}
                  onChange={e => this.handleChange(e, i)}
                >
                  {icons && icons.map(c => {
                    return (
                      <Option key={c.iconID} value={c.iconID}>{c.iconName}</Option>
                    )
                  })}
                </Select>
              </Col>
            );
          })}
        </Row>
      </Card>
    </>;
  }
}

export { Icons };
