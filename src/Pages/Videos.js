import React, { Component } from "react";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Card, Button, message } from "antd";
import { IMModal } from "../Common/Modal";
import { List } from "../Components/Videos/List";
import { VideoForm } from "../Components/Videos/VideosForm";

class Video extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    const { getVideos } = this.props;

    getVideos();
  }

  handleModal = (values) => {
    this.setState({ open: !this.state.open });
    if (!this.state.open) {
      if (values && "videoID" in values) {
        this.props.editRep(values);
      } else {
        this.props.editRep({
          videoURL: "",
        });
      }
    }
  };

  handleDelete = (values) => {
    const { getVideos, deleteVideos } = this.props;
    deleteVideos(values.videoID)
      .then(() => {
        message.success("Video Deleted", 5);
        getVideos();
      })
      .catch((err) => message.error(err.payload.message, 5));
  };

  handleSave = (e, form) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const { getVideos, saveVideos, updateVideos, videos } = this.props;
        const id = this.props.rep.videoID;
        if (!id) {
          values.sort = videos && videos.length;
          saveVideos(values).then(() => {
            this.handleModal();
            message.success("Video is Added", 5);
            getVideos();
          });
        } else {
          values.videoID = id;
          values.sort = this.props.rep.sort;
          updateVideos(values).then(() => {
            this.handleModal();
            message.success("Video is Updated", 5);
            getVideos();
          });
        }
      }
    });
  };
  render() {
    const { open } = this.state;
    const { getVideos, videos, loading, rep, updateVideosSort } = this.props;

    return (
      <Card title="Video" className="width-100">
        <div className="d-flex-row justify-end">
          <Button icon={<PlusSquareOutlined />} onClick={this.handleModal}>
            Add Video
          </Button>
        </div>
        <List
          videos={videos}
          loading={loading}
          handleModal={this.handleModal}
          handleDelete={this.handleDelete}
          getVideos={getVideos}
          updateVideosSort={updateVideosSort}
        />
        <IMModal
          title="Video"
          open={open}
          Component={VideoForm}
          handleModal={this.handleModal}
          handleSave={this.handleSave}
          loading={loading}
          rep={rep}
        />
      </Card>
    );
  }
}

export { Video };
