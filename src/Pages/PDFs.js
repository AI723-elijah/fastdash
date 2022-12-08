import React, { Component } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Card, Button, Input , message, Modal } from 'antd';
import { List } from '../Components/Pdfs/List';
import { PdfForm } from '../Components/Pdfs/PdfForm';
import { ChangePdfPassword } from '../Components/Pdfs/ChangePdfPassword';
import firebase from 'firebase/app';
import 'firebase/storage';

class PDFs extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            modalType: '',
            pdfsList: this.props && this.props.pdfs,
            pdf: '',
            img: '',
            pdfVerified: false
        };
    }

    componentDidMount() {
        const { getPdfs } = this.props;
            getPdfs();
    }

    componentDidUpdate(oldProps) {
        const { pdfs } = this.props;
            
        if(oldProps.pdfs !== pdfs) {
            this.setState({ pdfsList: pdfs });
        }
    }

    handleSearch = async (e) => {
        const { pdfs } = this.props;
        var searchFilter = e.target.value && e.target.value.toLowerCase()
        let searchPdf = [];
        
      searchPdf = pdfs && pdfs.filter(item => {
        return Object.keys(item).some(key =>
          typeof item[key] === "string" && item[key] && item[key].toLowerCase().includes(searchFilter)
        );
      })
        
        if (searchPdf) {
            this.setState({ pdfsList: searchPdf })
        }
        else {
            this.setState({ pdfsList: pdfs })
        }
    }

    handleModal = (values, type) => {
        const { open, modalType } = this.state;
        this.setState({ open: !this.state.open, modalType: type });
    
        if (!open && modalType !== 'Change Password') {
            if (values && 'pdfID' in values) {
                this.props.editRep(values);
            } else {
                this.props.editRep({
                    name: ''
                })
            }
        }
    }

    handleDelete = (values) => {
        const { deletePdf, getPdfs } = this.props;
        deletePdf(values && values.pdfID)
            .then(() => {
                message.success('PDF removed', 5);
                getPdfs();
            })
            .catch((err) => 
                message.error(err.payload.message, 5)
            );
    }

    handleVerifyPassword = (e, form) => {
        e.preventDefault();

        const { verifyPDF } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                verifyPDF(values)
                .then(() => {
                    this.handleModal();
                    this.setState({ pdfVerified: true })
                })
                .catch((err) => {
                    message.error(err.payload, 5);
                    this.setState({ pdfVerified: false })
                });
            }
        })
    }

    hanldeChangePassword = (e, form) => {
        e.preventDefault();

        const { ChangePdfPassword, getPdfs } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                if (values.newPassword !== values.confirmNewPassword) {
                    message.error('Confirm New Password does not match to New Password', 5);
                }
                else {
                    ChangePdfPassword(values)
                    .then(() => {
                        this.handleModal();
                        message.success('Pdf password changed successfully', 5);
                        getPdfs();
                    })
                    .catch((err) => {
                        message.error(err.payload, 5);
                    });
                }
            }
        })
    }

    handleSave = (e, form) => {
        e.preventDefault();
        
        const { addPdf, updatePdf, getPdfs, rep } = this.props;
        const { pdf, img, modalType } = this.state;
        form.validateFields((err, values) => {
            if (!err) {
                values.pdf = pdf ? pdf : rep.pdf;
                values.image = img ? img : rep.image;
                this.setState({img: values.image, pdf: values.pdf})
                if (modalType === 'Add PDF') {
                    addPdf(values)
                        .then(() => {
                            this.handleModal();
                            message.success('Added new pdf successfully', 5);
                            getPdfs();
                        })
                        .catch((err) => message.error(err.payload.message, 5));
                }
                else {
                    let payload = {
                        ...this.props.rep,
                        ...values
                    }
                    updatePdf(payload)
                        .then(() => {
                            this.handleModal();
                            message.success('Pdf has been updated', 5);
                            getPdfs()
                        })
                        .catch((err) => message.error(err.payload.message, 5));
                }
                this.setState({img: '', pdf: ''})
          }
        });
      }

      handleUploadPDFSuccess = filename => {
        message.success('File Uploaded Successfully!', 5);
        if(process.env.REACT_APP_NAME === 'westgate') {
          this.props.stopLoading();
          this.setState({ pdf: filename });
        } else {
          firebase
            .storage()
            .ref('pdfs')
            .child(filename)
            .getDownloadURL()
            .then(url => {
              this.props.stopLoading();
              this.setState({ pdf: url });
            });
        }
      }

      handleUploadImageSuccess = filename => {
        message.success('File Uploaded Successfully!', 5);
        if(process.env.REACT_APP_NAME === 'westgate') {
          this.props.stopLoading();
          this.setState({ img: filename });
        } else {
          firebase
            .storage()
            .ref('pdfs')
            .child(filename)
            .getDownloadURL()
            .then(url => {
              this.props.stopLoading();
              this.setState({ img: url });
            });
        }
      }

    render() {
        const { open, pdfsList, modalType, img, pdf } = this.state;
        const modalTitle = `${modalType}`;

        return (
            <Card title='PDF' className='width-100'>
                    <div className='d-flex justify-end'>
                         <Input 
                            className='select-user mx-10'
                            placeholder='Search PDF'
                            onChange={(e) => this.handleSearch(e)}
                        />
                            <Button
                                icon={<PlusSquareOutlined />} 
                                onClick={() => this.handleModal(null, 'Add PDF')}
                                className='mx-10'
                             >
                                Add PDF
                            </Button>
                            <Button 
                                onClick={() => this.handleModal(null, 'Change Password')}
                            >
                                Change Password
                            </Button>
                    </div>
                <List
                    pdfsList={pdfsList}
                    loading={this.props.loading}
                    handleModal={this.handleModal}
                    handleDelete={this.handleDelete}
                    verifyPDF={this.props.verifyPDF}
                />
                <Modal title={modalTitle} visible={open} footer={null} onCancel={this.handleModal} destroyOnClose={true}>
                   {(modalType === 'Change Password' || modalType === 'Verify Password') ?
                    <ChangePdfPassword
                        loading={this.props.loading}
                        hanldeChangePassword={this.hanldeChangePassword}
                        modalType={modalType}
                        handleVerifyPassword={this.handleVerifyPassword}
                    />
                    :
                    <PdfForm
                        handleSave={this.handleSave}
                        loading={this.props.loading}
                        img={img}
                        pdf={pdf}
                        pdfDetail={this.props.rep}
                        handleUploadPDFSuccess={this.handleUploadPDFSuccess}
                        handleUploadImageSuccess={this.handleUploadImageSuccess}
                    />
                    }
                </Modal>
            </Card>
        );
    }
}

export { PDFs };
