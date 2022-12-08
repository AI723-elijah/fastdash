import React from 'react';
import { Table, Switch, Select } from 'antd';
const { Option } = Select;

const handleChange = (checked, setSyncStatus, currentAttribute, getAttributes, setSelectedAttributes) => {
  const params = {
    attributeID: currentAttribute.attributeID,
    attributeName: currentAttribute.attributeName
  }
  if (checked) {
    params.syncStatus = true;
  } else {
    params.syncStatus = false;
  }
  setSyncStatus(params).then(res => {
    getAttributes();
    setSelectedAttributes(res.payload);
  });
}

const List = ({ attributes, loading, setSyncStatus, getAttributes, setSelectedAttributes,updateAttributeSort }) => {


  const hasFeature = process.env.REACT_APP_FEATURE_FLAG === 'website-on';
  const handleSort = (att,e)=>{
    const payload = {
        attributeID:att.attributeID,
        attributeName:att.attributeName,
        sort:e
    }
    updateAttributeSort(payload).then(res=>{
      getAttributes();
    })
  }
  
  const columns = [{
    title: 'Attribute Code',
    dataIndex: 'attributeID',
    sorter: (a, b) => {
      if (a.attributeID > b.attributeID) return 1;
      if (a.attributeID < b.attributeID) return -1;
      return 0;
    }
  }, {
    title: 'Attribute Name',
    dataIndex: 'attributeName',
    sorter: (a, b) => {
      if (a.attributeName.toLowerCase() > b.attributeName.toLowerCase()) return 1;
      if (a.attributeName.toLowerCase() < b.attributeName.toLowerCase()) return -1;
      return 0;
    }
  }, {
    title: 'Attribute Type',
    dataIndex: 'type'
    },
    {
    title: 'Websites',
      dataIndex: 'websites',
      render: (text, record) => {
        return (
          <ul>
            {record && record.websites && record.websites.map((web) => 
              <li>{web.name}</li>
            )}
          </ul>
      )
    }
  },
  {
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
            {attributes && attributes.map((att,index) => (
              <Option key={att.attributeID} value={index+1}>{index+1}</Option>
            ))}


          </Select>

        </>
      )

    }

  },

  {
    title: hasFeature && 'Actions',
    dataIndex: hasFeature && 'actions',
    render: hasFeature ? (_, currentAttribute) => {
      return (
        <Switch
          size='small'
          checkedChildren='sync on'
          unCheckedChildren='sync off'
          onChange={checked => handleChange(checked, setSyncStatus, currentAttribute, getAttributes, setSelectedAttributes)}
          checked={currentAttribute.syncStatus === true ? true : false}
        />
      )
    } : null
  }];

  return (
    <Table className='my-10' columns={columns} dataSource={attributes} loading={loading} />
  );
}

export { List }
