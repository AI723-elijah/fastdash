import React from 'react';
import { BranchesOutlined, DeleteOutlined, FileOutlined, ToolOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import './Styles/List.scss';
import { optionURL } from '../../Common/createOptionURL';

const List = ({ options, loading,deleteoption,updateOption,openLinkModal }) => {
    if(options && options.length>0){
        options.map(opt=>{
            if(opt.images.length>0){
                opt.image = opt.images[0].image
            }
            return opt
        })
    }
const columns = [{
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      return 0;
    }
  }, {
      title: 'Description',
      dataIndex: 'description',
      sorter: (a, b) => {
        if (a.description.toLowerCase() > b.description.toLowerCase()) return 1;
        if (a.description.toLowerCase() < b.description.toLowerCase()) return -1;
        return 0;
      }
    },{
    title: 'Image',
    dataIndex: 'image',
    render: (text, record) => {
      let src = '';
      if(record.image) {
        src = optionURL(record.image)
      }
      return (
        <div className='image-container'>
          <img src={src} alt={record.image} />
        </div>
      );
    },
  }, {
title:'Documents',
dataIndex:'documents',
render:(text,docs)=>{
  return (
    <div >
      {docs.documents.map(doc=>(
        <div className="document-list"> <FileOutlined />{doc.type}</div>
      ))}
    </div>
  );
}
  },{
    title: 'Actions',
    align: 'center',
    dataIndex: 'actions',
    render: (text, record) => (
    <>
    <div className="table-actions-btn">
      <div className="action-item">
      <button className="action-btn" onClick={() => handleLink(record)}>
      <BranchesOutlined />
        Bulk Link</button>
      </div>
      <div className="action-item">
      <button className="action-btn"
        onClick={() => handleUpdate(record)}>
                <ToolOutlined />
          Update</button>
      </div>
      <div className="action-item">
      <button className="action-btn"
        onClick={() => handleDelte(record)}>
         <DeleteOutlined />
         Delete</button>
      </div>
    </div>
    </>
    ),
  }];
  const handleUpdate =(record)=>{
    updateOption(record);
  }
  const handleLink = (record)=>{
    openLinkModal(record)
  }
  const handleDelte=(record)=>{
    deleteoption(record.productID);
  }
  return (
    <Table className='my-10 icons-list' columns={columns} dataSource={options} loading={loading} />
  );
}

export { List }
