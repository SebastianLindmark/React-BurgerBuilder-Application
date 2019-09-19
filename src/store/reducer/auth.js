import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null });
}

const setAuthRedirectPath = (state,action) => {
    return updateObject(state, {authRedirectPath : action.path});
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            }

        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                userId: action.userId,
                token: action.idToken,
                error: null
            }

        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state,action);
        default:
            return state;

    }

}

export default reducer;