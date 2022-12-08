import React, { Component } from 'react';
import { PlusSquareOutlined, SearchOutlined } from '@ant-design/icons';
import { Card, Input, Button, message } from 'antd';
import { IMModal, ExsistingAttributeModal, CreatedAttributeModal } from '../Common/Modal';
import { List } from '../Components/Attributes/List';
import { AttributeForm } from '../Components/Attributes/AttributeForm';
import AttributesList from '../Components/Attributes/UnsyncedAtrributesList';

import './Styles/Attributes.scss';

class Attributes extends Component {
  constructor() {
    super();
    this.state = {
      openAddModal: false,
      openResModal: false,
      openUnsynchedModal: false,
      attributes: [],
      unSyncedAttributes: [],
      createdAttributes: [],
      NeedsSync: false
    };
  }

  async componentDidMount() {
    const { getAttributes } = this.props;
    getAttributes();
  }

  componentDidUpdate(oldProps) {
    let { attributes } = this.props;
    if (attributes !== oldProps.attributes) {
      this.setState({ attributes: attributes.map(e => { return { ...e, key: e.attributeID } }) });
    }
  }

  handleAddModal = () => {
    this.setState({
      openAddModal: !this.state.openAddModal
    });
  };

  handleResModal = () => {
    this.setState({
      openResModal: !this.state.openResModal
    });
  };

  handleUnsyncedModal = () => {
    this.setState({
      openUnsynchedModal: !this.state.openUnsynchedModal
    });
  };

  handleExistingAttributesModal = () => {
    this.setState({
      NeedsSync: !this.state.NeedsSync
    });
  }

  handleSync = () => {
    const { selectedAttributes, syncAttributesToSite } = this.props;
    syncAttributesToSite({ attributesToSync: selectedAttributes }).then(res => {
      const { syncableAttributes } = res.payload;
      if (syncableAttributes.length !== 0) {
        const formattedArray = syncableAttributes.map(sa => {
          if (sa.syncable) {
            return {
              attribute_id: sa.attributeID,
              attribute_code: sa.attributeName,
              frontend_input: sa.type,

            };
          }
          return sa
        });
        const improvedFormattedArray = formattedArray.filter(fa => fa !== undefined);
        improvedFormattedArray.length > 0 ?
          this.setState({
            ...this.state,
            unSyncedAttributes: improvedFormattedArray
          }, () => {
            this.handleUnsyncedModal();
          }) :
          this.setState({
            ...this.state,
            NeedsSync: true
          });
      }
    })
  }

  handleSave = (e, form) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        this.handleAddModal();
        const { saveAttribute, getAttributes } = this.props;
        saveAttribute(values)
          .then(() => {
            message.success('Attribute has been created', 5);
            getAttributes()
          })
          .catch(err => message.error(err.payload.message, 5));
      }
    });
  }

  handleCreateAttributesMage = () => {
    this.handleUnsyncedModal();
    const { createAttributesMagento, getAttributes } = this.props;
    const { unSyncedAttributes } = this.state;
    createAttributesMagento({ attributesToCreate: unSyncedAttributes })
      .then((res) => {
        const { createdAttributes } = res.payload;
        if (createdAttributes.length > 0) {
          const formattedArray = createdAttributes.map(sa => {
            return { attribute_code: sa.attributeName };
          });

          this.setState({
            ...this.state,
            createdAttributes: formattedArray
          }, () => {
            this.setState({ ...this.state, openResModal: true })
          });
          getAttributes();
        }
      })
      .catch(err => message.error(err.parload ? err.payload.message : err, 5));
  }

  render() {
    const { attributes, unSyncedAttributes, createdAttributes, openUnsynchedModal, openAddModal, openResModal, NeedsSync } = this.state;
    const hasFeature = process.env.REACT_APP_FEATURE_FLAG === 'website-on';

    return (
      <Card title='ATTRIBUTES' className='width-100 attributes-list'>
        <div className='d-flex-row justify-between'>
          <Input
            className='search-box'
            placeholder='Search Attributes'
            onChange={e => this.props.searchAttributes(e.target.value)}
            addonAfter={<SearchOutlined />}
          />
          {
            hasFeature ?
              <Button onClick={this.handleSync}>Sync with website</Button> : null
          }
          <Button icon={<PlusSquareOutlined />} onClick={this.handleAddModal}>Add Attribute</Button>
        </div>
        <List
          attributes={attributes}
          loading={this.props.loading}
          setSyncStatus={this.props.updateAttribute}
          getAttributes={this.props.getAttributes}
          setSelectedAttributes={this.props.setSelectedAttributes}
          updateAttributeSort= {this.props.updateAttributeSort}
        />
        <IMModal
          open={openUnsynchedModal}
          handleModal={this.handleUnsyncedModal}
          handleSave={this.handleCreateAttributesMage}
          Component={AttributesList.UnsyncedAttributesList}
          unSyncedAttributes={unSyncedAttributes}
          title='Unsynced Attributes'
        />
        <IMModal
          open={openAddModal}
          handleModal={this.handleAddModal}
          handleSave={this.handleSave}
          Component={AttributeForm}
          title='Attribute'
        />
        <CreatedAttributeModal
          open={openResModal}
          handleModal={this.handleResModal}
          Component={AttributesList.createdAttributesList}
          createdAttributes={createdAttributes}
          title='Created Attribute'
        />
        <ExsistingAttributeModal
          open={NeedsSync}
          handleModal={this.handleExistingAttributesModal}
          Component={() => <div>Already up-to-date, nothing to Sync</div>}
          title='Attributes Up-to-date'
        />
      </Card>
    );
  }
}

export { Attributes };
