import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { SlideIn } from '../../Pages/SlideIn';
import { getCategories } from '../Actions/Categories';
import { getSlideIns, deleteSlideIn, editRep, updateSlideIn, saveSlideIn } from '../Actions/SlideIn';
import { startLoading, stopLoading } from '../Actions/Loading';

const mapStateToProps = state => {
    return {
        loading: state.loadingReducer.loading,
        slideIns: state.slideInReducer.slideIns,
        rep: state.salesReducer.rep,
        categories: state.slideInReducer.categories,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSlideIns: bindActionCreators(getSlideIns, dispatch),
        editRep: bindActionCreators(editRep, dispatch),
        updateSlideIn: bindActionCreators(updateSlideIn, dispatch),
        deleteSlideIn: bindActionCreators(deleteSlideIn, dispatch),
        saveSlideIn: bindActionCreators(saveSlideIn, dispatch),
        startLoading: bindActionCreators(startLoading, dispatch),
        stopLoading: bindActionCreators(stopLoading, dispatch),
        getCategories: bindActionCreators(getCategories, dispatch)
    }
}

const SlideInContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SlideIn));
export { SlideInContainer };
