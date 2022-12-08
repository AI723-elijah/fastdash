import React, { useState } from 'react';
import { Table, Modal, Button, message, Popconfirm,Select } from 'antd';

import { iconURL } from '../../Common/createIconURL';
import { UpdateOptionForm } from './UpdateIconForm';
import './Styles/List.scss';
const { Option } = Select;

const UpdateOptionModal = ({ isVisible, selectedIcon, closeModal, update, getIcons }) => {

  return (
    <Modal
      title="Update Option"
      visible={isVisible}
      onCancel={() => closeModal()}
      destroyOnClose={true}
      footer={null}
    >
      <UpdateOptionForm selectedIcon={selectedIcon} updateIcon={update} getIcons={getIcons} closeModal={closeModal} />

    </Modal>
  )
}

const List = ({ icons, loading, updateIcon, getIcons, deleteIcon,updateIconSort }) => {

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

  function handleUpdate(icon) {
    setIsUpdateModalOpen(true);
    setSelectedIcon(icon);
  }

  function closeUpdateModal() {
    setIsUpdateModalOpen(false);
  }

  function handleDelete(record) {
    deleteIcon(record.iconID);
    message.success('Icon Deleted Successfully');
  }
  const handleSort = (icon,e)=>{
    const payload = {
        iconID:icon.iconID,
        iconName:icon.iconName,
        sort:e
    }
    updateIconSort(payload).then(res=>{
      getIcons();
    })
  }
  const columns = [{
    title: 'Icon Name',
    dataIndex: 'iconName',
    sorter: (a, b) => {
      if (a.iconName.toLowerCase() > b.iconName.toLowerCase()) return 1;
      if (a.iconName.toLowerCase() < b.iconName.toLowerCase()) return -1;
      return 0;
    }
  }, {
    title: 'Icon',
    dataIndex: 'iconURL',
    render: (text, record) => {
      let src = '';
      if (record.iconURL) {
        src = iconURL(record.iconURL)
      }

      return (
        <div className='image-container'>
          <img src={src} alt='Icon' />
        </div>
      );
    }
  },{
    title: 'Sort',
    dataIndex: 'sort',
    render: (text, record) => {
      return (
        <>
          <Select
            className='width-100'
            value={record.sort}
            onChange={(e) => handleSort(record, e)}

          >
            {icons && icons.map((ic,index) => (
              <Option key={ic.IconID} value={index+1}>{index+1}</Option>
            ))}


          </Select>

        </>
      )

    }

  }, {
    title: 'Actions',
    dataIndex: 'actions',
    render: (text, record) => {
      return (
        <div>
          <Button type="primary" onClick={() => handleUpdate(record)} style={{ marginRight: '5px' }} >Edit</Button>

          <Popconfirm
            title="Are you sure delete this option?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No">
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </div>
      )
    }
  }];

  return (
    <>
      <Table className='my-10 icons-list' columns={columns} dataSource={icons} loading={loading} />
      <UpdateOptionModal isVisible={isUpdateModalOpen} selectedIcon={selectedIcon} closeModal={closeUpdateModal} update={updateIcon} getIcons={getIcons} />

    </>
  );
}

export { List }
