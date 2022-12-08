
import { handleActions } from 'redux-actions';
import * as actions from '../Constants/Constants';

const initialState = {
    questions: []
};

const handlers = {
    [actions.GET_ALL_QUESTIONS_SUCCESS]: (state, action) => {
        return { ...state, questions: action.payload.data }
    },
    [actions.GET_ALL_QUESTIONS_FAILURE]: (state) => ({ ...state }),
    [actions.UPDATE_QUESTION_SUCCESS]: (state) => ({ ...state }),
    [actions.BULK_UPDATE_QUESTIONS_SUCCESS]:(state)=>({ ...state }),
    [actions.BULK_UPDATE_QUESTIONS_FAILURE]: (state) => ({ ...state }),
    [actions.ANSWER_EMAIL_SUCCESS]: (state) => ({...state})

}

const QandAReducer = handleActions(handlers, initialState);
export { QandAReducer };