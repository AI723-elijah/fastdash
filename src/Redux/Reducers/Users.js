import { handleActions } from 'redux-actions';
import * as actions from '../Constants/Constants';

const initialState = {
    dashboardUsers: [],
    portalUsers: [],
    user: {},
    rep: {}
};

const setValues = (payload, state) => {
    let dUsers = [];
    let pUsers = [];
    payload && payload.data && payload.data.map((user) => {
        if (!user.hideUser) {
            if (user.type === 'dashboard') {
                dUsers.push(user)
            }
            else {
                pUsers.push(user)
            }
        }
        return user
    })
    return {
        ...state,
        dashboardUsers: dUsers,
        portalUsers: pUsers
    }
};

const handlers = {
    [actions.GET_USERS_SUCCESS]: (state, action) => (setValues(action.payload, state)),
    [actions.GET_USER_DETAIL_SUCCESS]: (state, action) => ({ ...state, user: action.payload }),
    [actions.UPDATE_USER_SUCCESS]: (state, action) => ({ ...state, rep: action.payload }),
    [actions.EDIT_REP]: (state, action) => ({ ...state, rep: action.payload }),
};

const usersReducer = handleActions(handlers, initialState);
export { usersReducer };