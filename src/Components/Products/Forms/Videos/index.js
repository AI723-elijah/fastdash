import React, { Component } from "react";
import { DeleteOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Card, Button, Row, Col, Input, Modal } from "antd";

class Videos extends Component {
	state = {
		modalOpen: false,
        selectedOption: ''
	};

    handleVideoChange = (e, i, name) => {
        let { handleStateChange, product, videos } = this.props;
 
        let existing_videos = [...videos];
       
        existing_videos[i][name] = e.target.value;
        product.videos = existing_videos;
                
        handleStateChange(existing_videos, "videos");
        handleStateChange(product, "product");
    };

    handleSort = (e, i) => {
        let { handleStateChange, product, videos } = this.props;
        videos[i].sort = e.target.value;
        product.videos = videos;
       
        handleStateChange(videos, "videos");
        handleStateChange(product, "product");
    };

	handleDelete = (val, i) => {
		this.setState({ modalOpen: true, selectedOption: val, selectedIndex: i });
	};

	deleteVideo = () => {
		this.setState({ modalOpen: false }, () => {
			let {
                product,
				videos,
				handleStateChange,
				removeParentProductVideo,
			} = this.props;

            let { selectedOption, selectedIndex } = this.state;

			videos && videos.splice(selectedIndex, 1)
			removeParentProductVideo(selectedOption && selectedOption.productVideoID);
			
            product.videos = videos;
            handleStateChange(videos, "videos");
            handleStateChange(product, "product");
		});
	};

	render() {
		const {
			videos,
			handleAddToArray,
			// form: { getFieldDecorator },
		} = this.props;

		const newVideo = {
			video: "",
            sort: 0,
            channelID: 0,
            thumbnail: ""
		};

		return <>
            <Modal
                title="Delete Video"
                visible={this.state.modalOpen}
                onOk={this.deleteVideo}
                onCancel={() => {
                    this.setState({ modalOpen: false });
                }}
            >
                <h3>Are you sure you want to delete this video? </h3>
            </Modal>
            <div className="mx-15 d-flex-row justify-end">
                <Button onClick={() => handleAddToArray("videos", newVideo)}>
                    Add Video
                </Button>
            </div>
            <Row className="my-10" gutter={16}>
                {videos && videos.map((val, i) => {
                    return (
                        <Col key={i} xs={24} md={12}>
                            <Card
                                hoverable
                                className="my-10"
                                extra={
                                    <DeleteOutlined onClick={() => this.handleDelete(val, i)} />
                                }
                                title={val.thumbnail}
                            >
                                <Row>
                                    <Col md={24} xs={24}>
                                        <label>Title</label>
                                        <Input 
                                            placeholder = 'Title'
                                            size = 'large'
                                            name = 'thumbnail'
                                            required
                                            defaultValue = {val.thumbnail}
                                            onChange = {(e) => this.handleVideoChange(e, i, 'thumbnail')}
                                        />
                                    </Col>
                                </Row>

                                <br />
                                {val && val.video ? 
                                    <Row>
                                        <Col md={24} xs={24}>
                                            <iframe width="320" height="215"
                                                title={val.video}
                                                src={val.video}
                                            />
                                        </Col>
                                    </Row>
                                    :
                                    <Row>
                                        <Col md={24} xs={24}>
                                            <label>Video</label>
                                            <Input 
                                                placeholder = 'Video'
                                                size = 'large'
                                                type='url'
                                                name = 'video'
                                                required
                                                defaultValue = {val && val.productVideoID ? val.video : ''}
                                                onChange = {(e) => this.handleVideoChange(e, i, 'video')}
                                            />
                                        </Col>
                                    </Row>
                                }

                                {val.video && 
                                    <Row>
                                        <Col md={24} xs={24}>
                                            <label>Sort</label>
                                            <Input 
                                                placeholder = 'Sort'
                                                size = 'large'
                                                type='number'
                                                name = 'sort'
                                                defaultValue = {val.sort || i}
                                                onChange = {(e) => this.handleSort(e, i)}
                                            />
                                        </Col>
                                    </Row>
                                }
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </>;
	}
}

let VideosTab = Form.create()(Videos);
export { VideosTab };