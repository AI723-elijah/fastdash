import React from 'react';
import { FilePdfOutlined } from '@ant-design/icons';
import { Table, Button, Popconfirm } from 'antd';
import { pdfDocURL, pdfImageURL } from '../../Common/createPdfURL';

const List = ({ pdfsList, loading, handleModal, handleDelete, verifyPDF }) => {

// const handlePdf = async(record) => {
//     if (record.passwordProtected === 'yes') {
//       let password = prompt("Please enter password to proceed", "");
//       await verifyPDF(password)
//         .then(() => {
//           return true;
//         })
//         .catch(() => {
//           return false;
//         })
//     }
//    else {
//      return true
//    }
// }

    const pdfColumns = [
      {
        title: 'PDF',
        dataIndex: 'pdf',
        render: (text, record) => {
          let src = '';
          if(record.pdf) {
            src = pdfDocURL(record.pdf)
          }

          return (
            <div className='image-container'>
              { src &&
                      <span className='d-flex-row align-center'>
                        <FilePdfOutlined className='icon' />
                        <a 
                          className='mx-10'
                          // onClick={() => handlePdf(record)}
                          href={src} 
                          target='_blank' 
                           rel='noopener noreferrer'
                        >
                          {record.pdf}
                        </a>
                      </span>
                    }
            </div>
          );
        }
        },{
        title: 'PDF Title',
        dataIndex: 'title'
        }, {
        title: 'Password Protected',
        dataIndex: 'passwordProtected'
        },{
          title: 'Image',
          dataIndex: 'image',
          render: (text, record) => {
            return (
              <div>
                <img src={pdfImageURL(record.image)} alt={record.title} 
                  style={{height: '100px'}}
                />
              </div>
            )
          }
        }, {
        title: 'Action',
        dataIndex: 'action',
        render: (text, record) => {
            return (
              <>
                <Button type="primary" onClick={() => handleModal(record, 'Edit PDF')} style={{ marginRight: '5px' }} >Edit</Button>
                <Popconfirm
                  title="Are you sure delete this pdf?"
                  onConfirm={() => handleDelete(record)}
                  okText="Yes"
                  cancelText="No">
                  <Button type="danger">Delete</Button>
                </Popconfirm>
                </>
                );
            }
        }]

  return (
    <>
      <Table 
        className='my-10' 
        columns={pdfColumns} 
        dataSource={pdfsList} 
        loading={loading} 
      />
      </>
  );
}

export { List }
