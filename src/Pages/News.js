import React, { Component } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Card, Button, message } from 'antd';
import { IMModal } from '../Common/Modal';
import { List } from '../Components/News/List';
import { NewsForm } from '../Components/News/NewsForm';

class News extends Component {
    constructor() {
        super();

        this.state = {
            open: false,
            newsImage: '',
            desc: ''
        };
    }

    componentDidMount() {
        const { getNews } = this.props;

        getNews();
    }

    handleModal = values => {
        this.setState({ open: !this.state.open });
        if (!this.state.open) {
            if (values && 'newsID' in values) {
                this.props.editRep(values);
                this.setState({ desc: values.description, newsImage: values.newsImage });
            } else {
                this.setState({ newsImage: '', desc: '' })
                this.props.editRep({
                    title: '',
                    description: '',
                    shortDesc: ''
                })
            }
        }
    }

    handleDelete = values => {
        const { getNews, deleteNews } = this.props;
        deleteNews(values.newsID)
        .then(() => {
          message.success('News Deleted', 5);
          getNews();
        })
        .catch(err => message.error(err.payload.message, 5));
    }

    handleSave = (e, form) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                const { getNews, saveNews, updateNews } = this.props;
                values.newsImage = this.state.newsImage;
                values.description = this.state.desc;
                this.handleModal();
                const id = this.props.rep.newsID;
                if (!id) {
                    saveNews(values)
                    .then(() => {
                        message.success('News is Added', 5);
                        getNews();
                    })
                } else {
                    values.newsID = id;
                    updateNews(values)
                        .then(() => {
                            message.success('News is Updated', 5);
                            getNews();
                        })
                }
            }
        });
    }

    handleDesc = e => {
        this.setState({ desc: e })
    }

    handleUploadStart = () => {
        this.props.startLoading();
    }

    handleUploadSuccess = (filename, name) => {
        message.success('Image Uploaded Successfully!', 5);
        this.setState({ newsImage: filename });
        this.props.stopLoading();
    }

    render() {
        const { open } = this.state;

        return (
            <Card title='News' className='width-100'>
                <div className='d-flex-row justify-end'>
                    <Button icon={<PlusSquareOutlined />} onClick={this.handleModal}>Add News</Button>
                </div>
                <List news={this.props.news} loading={this.props.loading} handleModal={this.handleModal} handleDelete={this.handleDelete}/>
                { open &&
                    <IMModal
                        title='News'
                        open={open}
                        Component={NewsForm}
                        handleModal={this.handleModal}
                        handleSave={this.handleSave}
                        handleUploadStart={this.handleUploadStart}
                        handleUploadSuccess={this.handleUploadSuccess}
                        loading={this.props.loading}
                        rep={this.props.rep}
                        desc={this.state.desc}
                        handleDesc={this.handleDesc}
                    />
                }
            </Card>
        );
    }
}

export { News };
