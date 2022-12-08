import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const ExsistingAttributeModal = props => {
  const { open, title, handleModal, Component } = props;
  return (
    <Modal
      visible={open}
      title={title}
      onCancel={handleModal}
      footer={[
        <Button key='close' onClick={props.handleModal}>
          OK
        </Button>
      ]}
    >
      <Component />
    </Modal>
  );
}

const DonwloadOrdersModal = props => {
  const [ startDate, setStartDate ]  = useState();
  const [ endDate, setEndDate ] = useState();
  const { open, title, handleCancel, Component, downloadOrders, loading } = props;
  
  const handleChangeStartDate = (data, dateString) => { setStartDate(dateString) };

  const handleChangeEndDate = (date, dateString) => { setEndDate(dateString) };
  
  const handleClick = () => {
    downloadOrders({
      startDate,
      endDate
    })
    .then(res=>{
      handleCancel();
    })
    .finally(_=>{
      handleCancel();
    });
  }
  return (
    <Modal
      visible={open}
      title={title}
      onCancel={handleCancel}
      footer={[
        <Button loading={loading} key='close' onClick={handleClick}>
          Download
        </Button>
      ]}
    >
      <Component handleChangeStartDate={handleChangeStartDate} handleChangeEndDate={handleChangeEndDate} />
    </Modal>
  );
}

const CreatedAttributeModal = props => {
  const { open, title, handleModal, Component, createdAttributes } = props;
  return (
    <Modal
      visible={open}
      title={title}
      onCancel={handleModal}
      footer={[
        <Button key='close' onClick={props.handleModal}>
          OK
        </Button>
      ]}
    >
      <Component createdAttributes={createdAttributes} />
    </Modal>
  );
}

const IMModal = props => {
  const {
    open,
    loading,
    handleModal,
    Component,
    title,
    rep,
    categories,
    category,
    associatedTo,
    unSyncedAttributes,
    updateProductSort,
    getByCategory,
    categoryID,
    startLoading,
    stopLoading,
    updateElasticSearchIndex
  } = props;
  const isReadyCreateAttributes = unSyncedAttributes && unSyncedAttributes.length > 0;
  return (
    <Modal
      title={title}
      visible={open}
      onCancel={handleModal}
      footer={[
        <Button key='close' onClick={props.handleModal}>
          Close
        </Button>,
        <Button
          loading={loading}
          onClick={!isReadyCreateAttributes ? null : props.handleSave}
          form={!isReadyCreateAttributes ? 'imForm' : null}
          key={!isReadyCreateAttributes ? 'submit' : 'confirm'}
          htmlType={!isReadyCreateAttributes ? 'submit' : null}
        >
          {!isReadyCreateAttributes ? 'Submit' : 'Confirm'}
        </Button>
      ]}
    >
      <Component
        getByCategory={getByCategory}
        updateProductSort={updateProductSort}
        channels={props.channels}
        handleSave={props.handleSave}
        handleUploadStart={props.handleUploadStart}
        handleUploadSuccess={props.handleUploadSuccess}
        handleSearch={props.handleSearch}
        handleDesc={props.handleDesc}
        desc={props.desc}
        products={props.products}
        rep={rep}
        categories={categories}
        category={category}
        loading={loading}
        associatedTo={associatedTo}
        unSyncedAttributes={unSyncedAttributes}
        handleDeleteAssociated={props.handleDeleteAssociated}
        categoryID={categoryID}
        handleModal={handleModal}
        startLoading={startLoading}
        stopLoading={stopLoading}
        updateElasticSearchIndex={updateElasticSearchIndex}
      />
    </Modal>
  );
}

export { IMModal, ExsistingAttributeModal, CreatedAttributeModal, DonwloadOrdersModal };
