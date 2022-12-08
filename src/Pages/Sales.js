import React, { Component } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Card, Button, Upload, message } from 'antd';
import * as XLSX from 'xlsx';
import csv from 'csvtojson';
import { IMModal } from '../Common/Modal';
import { List } from '../Components/Sales/List';
import { SalesForm } from '../Components/Sales/SalesForm';

const handleAction = (file) => {
  setTimeout(() => {
    file.onSuccess('ok');
  }, 0);
};

class Sales extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      salesrep: [],
      headers: [],
      fileList: []
    };
  }

  componentDidMount() {
    const { getSalesReps, getUsersList } = this.props;

    getSalesReps();
    getUsersList();
  }

  componentDidUpdate(oldProps) {
    const { salesReps } = this.props;

    if (oldProps.salesReps !== salesReps) {
      this.setState({ salesrep: salesReps });
    }
  }

  handleUpload = info => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    this.setState({ fileList });

    if (info.file.status !== 'uploading') {
      let reader = new FileReader();
      reader.onload = (e) => {
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        csv().fromString(data)
          .on('header', headers => {
            this.setState({ headers });
          }).then(res => {
            this.props.bulkUpload(res)
              .then(() => {
                message.success('Data has been uploaded', 5);
              });
            res = res.map((r, i) => {
              return {
                ...r,
                key: i
              }
            });
            this.setState(prevState => ({ salesrep: [...res] }));
          });
      };

      reader.readAsBinaryString(info.file.originFileObj);
    }
  }

  handleModal = values => {
    this.setState({ open: !this.state.open });
    if (values) {
      this.props.editRep(values);
    } else {

    }
  }

  handleSave = (e, form) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        this.handleModal();
        const { updateSalesReps, saveSalesReps, getSalesReps, portalUsers } = this.props;
        if (!this.props.rep.ID) {
          saveSalesReps(values)
            .then(() => {
              message.success('Sales Rep has been saved', 5);
              getSalesReps();

              const pendingUser = portalUsers.find(user => user.email === values.email.trim() && user.pendingRep);
              const existingReps = portalUsers.filter(user => Array.isArray(user.salesRepID) && user.salesRepID.includes(values.territory));
              const existingPortalUser = portalUsers.find(user => user.email === values.email);

              if (pendingUser || existingPortalUser) {
                this.handleUpdateExistingUser(values, pendingUser, existingReps, existingPortalUser);
              }
            })
            .catch(err => message.error(err.payload.message, 5));
        } else {
          values.ID = this.props.rep.ID;
          updateSalesReps(values)
            .then(() => {
              message.success('Sales Rep has been updated', 5);
              getSalesReps()
            })
            .catch(err => message.error(err.payload.message, 5));
        }
      }
    });
  }

  handleUpdateExistingUser = (values, pendingUser, existingReps, existingPortalUser) => {
    const { updateUser, sendVerifiedUserEmail, sendRepApprovedEmail, getUsersList } = this.props;

    let payload;

    if (pendingUser || existingPortalUser) {
      let repAdminFields = {
        role: 'admin',
        customerType: 'Representative',
        allowedAccess: ['dashboard', 'manageUsers', 'newOrder', 'returnRequest', 'openOrder', 'rmaSummary'],
        salesRepID: [values.territory]
      }

      if (pendingUser && !existingPortalUser) {
        payload = {
          ...pendingUser,
          ...repAdminFields,
          pendingRep: null
        }

      } else {
        if (existingPortalUser.customerType === 'Basic') {
          payload = {
            ...existingPortalUser,
            ...repAdminFields,
            pendingRep: null
          }
        } else {
          payload = {
            ...existingPortalUser,
            role: 'admin',
            salesRepID: [...existingPortalUser.salesRepID, values.territory],
            pendingRep: null
          }
        }
      }
    }
    updateUser(payload)
      .then(() => {
        if (payload.salesRepID.length === 1) {
          sendVerifiedUserEmail({ ...payload, emailsToBeSent: existingReps && existingReps.map(rep => rep.email) });
          sendRepApprovedEmail(payload);
        }
        getUsersList();
      })
      .catch((err) => message.error(err.payload.message, 5));
  }

  render() {
    const { fileList, salesrep } = this.state;

    return (
      <Card title='SALES REPS' className='width-100'>
        <div className='d-flex-row justify-end'>
          <Button
            icon={<PlusSquareOutlined />}
            onClick={() => this.handleModal()}
            className='mx-10'
          >
            Add Rep
          </Button>
          <Upload
            className='text-right'
            accept='.xls, .xlsx'
            fileList={fileList}
            customRequest={handleAction}
            onChange={this.handleUpload}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Upload Sales Reps</Button>
          </Upload>
        </div>
        <List salesrep={salesrep} loading={this.props.loading} handleModal={this.handleModal} />
        {this.state.open && <IMModal
          open={this.state.open}
          handleModal={this.handleModal}
          handleSave={this.handleSave}
          Component={SalesForm}
          title='Sales Rep'
          rep={this.props.rep}
        />}
      </Card>
    );
  }
}

export { Sales };
