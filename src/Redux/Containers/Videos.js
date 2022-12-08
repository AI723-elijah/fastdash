import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Video } from '../../Pages/Videos';
import { getVideos, saveVideos, deleteVideos, updateVideos, updateVideosSort, editRep } from '../Actions/Videos';
import { startLoading, stopLoading } from '../Actions/Loading';

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    videos: state.videosReducer.videos,
    rep: state.videosReducer.rep
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getVideos: bindActionCreators(getVideos, dispatch),
    editRep: bindActionCreators(editRep, dispatch),
    saveVideos: bindActionCreators(saveVideos, dispatch),
    updateVideos: bindActionCreators(updateVideos, dispatch),
    updateVideosSort: bindActionCreators(updateVideosSort, dispatch),
    deleteVideos: bindActionCreators(deleteVideos, dispatch),
    startLoading: bindActionCreators(startLoading, dispatch),
    stopLoading: bindActionCreators(stopLoading, dispatch)
  }
}

const VideosContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Video));
export { VideosContainer };
