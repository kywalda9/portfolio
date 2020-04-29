import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

//async
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        // setTimeout() method calls a function or evaluates an expression after a specified number of milliseconds.
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

//async
export const auth = (email, password, isSignup) => {
    return dispatch => {
        //.... authenticate user
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA9xWcrIL0AXbaPeeEtqWbNuZwyUhvoFlk';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA9xWcrIL0AXbaPeeEtqWbNuZwyUhvoFlk';
        }
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch (err => {
            console.log(err);
            dispatch(authFail(err.response.data.error));
        });
    };
};
