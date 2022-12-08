import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Select } from 'antd';
import { promotionalLiteratureURL } from '../../Common/createPromotionalLiteratureURL';
import './Styles/List.scss';
const { Option } = Select;
const List = ({ literatures, loading, handleModal, handleDelete, getLiteratures, updateLiteraturesSort }) => {

  literatures.sort((a, b) => {
    return b.sort - a.sort
  })

  const handleSort = async (literature, nextSortValue) => {
    // const replacedLiterature = literatures && literatures.find(lit => lit.sort === nextSortValue);
    // const prevSortValue = literatures && literature.sort;
    let payload = {};
    payload = {
      id: literatures && literature.literatureID,
      sort: Number(nextSortValue)
    }
    // await updateLiteraturesSort(payload);

    let newList = []
    await literatures && literatures.map((lit) => {
      if (lit.literatureID === payload.id) 
        newList.push(payload) 
      else 
        newList.push({
          id: lit && lit.literatureID,
          sort: Number(lit.sort)
        })
        return lit
    })

    let updateLit = await newList && newList.sort((a, b) => a.sort - b.sort)
      .map(async (lit, i) => {
      if (lit.id === payload.id) {
        await updateLiteraturesSort(payload);
      }
      else if (lit.id !== payload.id && lit.sort !== i) {
        let newPayload = {
          id: lit.id,
          sort: Number(i)
        }
        await updateLiteraturesSort(newPayload);
      }
      })
    
    updateLit && await getLiteratures();
    await getLiteratures();

    // Shuffle the replaced item
    // payload = {
    //   id: replacedLiterature && replacedLiterature.literatureID,
    //   sort: Number(prevSortValue)
    // }
    // await updateLiteraturesSort(payload);
  }

  const columns = [{
    title: 'Literature Name',
    dataIndex: 'literatureName',
    sorter: (a, b) => {
      if (a.literatureName.toLowerCase() > b.literatureName.toLowerCase()) return 1;
      if (a.literatureName.toLowerCase() < b.literatureName.toLowerCase()) return -1;
      return 0;
    }
  }, {
    title: 'Literature',
    dataIndex: 'literatureImage',
    render: (text, record) => {
      let src = '';
      if (record.literatureImage) {
        src = promotionalLiteratureURL(record.literatureImage)
      }
      return (
        <div className='image-container'>
          <img src={src} alt='Literature' />
        </div>
      );
    }
  }, {
    title: 'Sort',
    dataIndex: 'sort',
    render: (text, record) => {
      return (
        <>
          <Select
            showSearch
            className='width-100'
            value={record.sort}
            onChange={(e) => handleSort(record, e)}
          >
            {literatures && literatures.map((literature, index) => (
              <Option key={literature.literatureID} value={index}>{index}</Option>
            ))}
          </Select>
        </>
      )
    }
  }, {
    title: 'Update',
    dataIndex: 'actions',
    render: (text, record) => {
      return (
        <EditOutlined
          className='primary-icon-round'
          key='edit'
          onClick={() => handleModal(record, 'Update')} />
      );
    }
  }, {
    title: 'Delete',
    dataIndex: 'literatureID',
    render: (text, record) => {
      return (
        <DeleteOutlined
          className='primary-icon-round'
          key='delete'
          onClick={() => handleDelete(record)} />
      );
    }
  }];
  return (
    <Table className='my-10 icons-list' columns={columns} dataSource={literatures} loading={loading} rowKey="literatureID" />
  );
}

export { List }
