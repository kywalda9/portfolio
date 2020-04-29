import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_START,
        error: error
    };
};

//async
export const auth = (email, password) => {
    return dispatch => {
        //.... authenticate user
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true

        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA9xWcrIL0AXbaPeeEtqWbNuZwyUhvoFlk', authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data));
        })
        .catch (err => {
            console.log(err);
            dispatch(authFail(err));
        });
    };
};

