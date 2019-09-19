import * as actionTypes from './actionTypes'

import axios from 'axios'

//https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (token,userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId : userId,
        idToken : token,
    }
}

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate');

    return {
        type : actionTypes.AUTH_LOGOUT
    };
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout( () => {
            dispatch(logout());
        }, expirationTime * 1000) 
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');

        if(!token){
            dispatch(logout);
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const userId = localStorage.getItem('userId');
            if(expirationDate > new Date()){
                dispatch(authSuccess(token,userId));
            }else{
                dispatch(logout());
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
            
        }
    }
}

export const auth = (email, password, signup) => {
    return dispatch => {

        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }


        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCHFlkbsXWO2hpsmh_OokM2YFqaPigABVA';

        if (!signup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCHFlkbsXWO2hpsmh_OokM2YFqaPigABVA';
        }

        axios.post(url, authData)
            .then(response => {
                

                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

                localStorage.setItem('token',response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFailed(error.response.data.error))
                console.log(error);
            })



    }
}