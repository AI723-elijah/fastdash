import * as types from '../Constants/Constants';

export const startLoading = () => dispatch => {
  dispatch({
    type: types.LOADING
  })
};

export const stopLoading = () => dispatch => {
  dispatch({
    type: types.LOADING_COMPLETE
  })
};
