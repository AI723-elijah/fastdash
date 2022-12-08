import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const getQuestions = () => {
  let options = { url: 'productQA/' };
  options.types = [
    types.GET_ALL_QUESTIONS_SUCCESS,
    types.GET_ALL_QUESTIONS_FAILURE
  ]
  return api.get(options);
};

export const updateQA = params => {
  let options = { url: 'productQA/' };
  options.types = [
    types.UPDATE_QUESTION_SUCCESS,
    types.UPDATE_QUESTION_FAILURE
  ]
  return api.put(options, params);
};

export const bulkQuestionsUpdate = params=> {
  let options = { url: 'productQA/bulkUpdate' };
  options.types = [
    types.BULK_UPDATE_QUESTIONS_SUCCESS,
    types.BULK_UPDATE_QUESTIONS_FAILURE
  ]
  return api.post(options,params);
}

export const answerEmail = params =>{
  let options = { url: 'productQA/answerEmail' };
  options.types = [
    types.ANSWER_EMAIL_SUCCESS,
    types.ANSWER_EMAIL_FAILURE
  ]
  return api.post(options,params);
}
