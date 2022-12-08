import { api } from '../../Services/api';
import * as types from '../Constants/Constants';

export const editRep = params => dispatch => {
    dispatch({
        type: types.EDIT_REP,
        payload: params
    })
}

export const getSlideIns = () => {
    let options = { url: 'slidein/' };
    options.types = [
        types.SLIDE_IN_GET_SUCCESS,
        types.SLIDE_IN_GET_FAILURE
    ]

    return api.get(options);
};

export const saveSlideIn = params => {
    let options = { url: 'slidein/' };
    options.types = [
        types.LITERATURE_SAVE_SUCCESS,
        types.LITERATURE_SAVE_FAILURE
    ]

    return api.post(options, params);
};

export const updateSlideIn = params => {
    let options = { url: 'slidein/' };
    options.types = [
        types.LITERATURE_UPDATE_SUCCESS,
        types.LITERATURE_UPDATE_FAILURE
    ]

    return api.put(options, params);
};

export const deleteSlideIn = params => {
    let options = { url: `slidein/${params}` };
    options.types = [
        types.SLIDE_IN_DELETE_SUCCESS,
        types.SLIDE_IN_DELETE_FAILURE
    ]

    return api.delete(options, params);
};
