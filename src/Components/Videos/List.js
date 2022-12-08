import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Select } from 'antd';
import './Styles/List.scss';

const { Option } = Select;

const List = ({ videos, loading, handleModal, handleDelete, getVideos, updateVideosSort }) => {

  videos.sort((a, b) => {
    return b.sort - a.sort
  })

  const handleSort = async (video, nextSortValue) => {

    let payload = {};
    payload = {
      id: videos && video.videoID,
      sort: Number(nextSortValue)
    }

    let newList = []
    await videos && videos.map((vid) => {
      if (vid.videoID === payload.id) 
        newList.push(payload) 
      else 
        newList.push({
          id: vid && vid.videoID,
          sort: Number(vid.sort)
        })
        return vid
    })

    await getVideos();
    let updateLit = await newList && newList.sort((a, b) => a.sort - b.sort)
      .map(async (vid, i) => {
      if (vid.id === payload.id) {
        await updateVideosSort(payload);
        await getVideos();
      }
      else if (vid.id !== payload.id && vid.sort !== i) {
        let newPayload = {
          id: vid.id,
          sort: Number(i)
        }
        await updateVideosSort(newPayload);
        await getVideos();
      }
      })
    
    updateLit && await getVideos();
    await getVideos();
  }

const columns = [{
  title: 'Title',
  dataIndex: 'title'
  }, {
  title: 'Video URL',
  dataIndex: 'videoURL',
  sorter: (a, b) => {
    if (a.videoURL.toLowerCase() > b.videoURL.toLowerCase()) return 1;
    if (a.videoURL.toLowerCase() < b.videoURL.toLowerCase()) return -1;
    return 0;
  }
},  {
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
          {videos && videos.map((video, index) => (
            <Option key={video.videoID} value={index}>{index}</Option>
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
        onClick={() => handleModal(record)} />
    );
  }
}, {
  title: 'Delete',
  dataIndex: 'videoID',
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
    <Table className='my-10 icons-list' columns={columns} dataSource={videos} loading={loading} />
  );
}

export { List }
