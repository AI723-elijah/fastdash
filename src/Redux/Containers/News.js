import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { News } from '../../Pages/News';
import { getNews, saveNews, editRep, updateNews, deleteNews } from '../Actions/News';
import { startLoading, stopLoading } from '../Actions/Loading';

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    news: state.newsReducer.news,
    rep: state.newsReducer.rep
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editRep: bindActionCreators(editRep, dispatch),
    updateNews: bindActionCreators(updateNews, dispatch),
    deleteNews: bindActionCreators(deleteNews, dispatch),
    getNews: bindActionCreators(getNews, dispatch),
    saveNews: bindActionCreators(saveNews, dispatch),
    startLoading: bindActionCreators(startLoading, dispatch),
    stopLoading: bindActionCreators(stopLoading, dispatch)
  }
}

const NewsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(News));
export { NewsContainer };
