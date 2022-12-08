import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { QandA } from '../../Pages/QandA';
import { startLoading, stopLoading } from '../Actions/Loading';
import { removeQuestion } from '../Actions/ProductForm';
import { bulkQuestionsUpdate, answerEmail, getQuestions, updateQA } from '../Actions/QandA';

const mapStateToProps = state => {
    return {
        loading: state.loadingReducer.loading,
        questions:state.QandAReducer.questions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        startLoading: bindActionCreators(startLoading, dispatch),
        stopLoading: bindActionCreators(stopLoading, dispatch),
        getQuestions: bindActionCreators(getQuestions, dispatch),
        removeQuestion: bindActionCreators(removeQuestion, dispatch),
        bulkQuestionsUpdate: bindActionCreators(bulkQuestionsUpdate, dispatch),
        answerEmail: bindActionCreators(answerEmail, dispatch),
        updateQA: bindActionCreators(updateQA, dispatch)
    }
}

const QandAContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(QandA));
export { QandAContainer };
