import authService from '../services/authService';
import googleService from '../services/googleService';
import { USER_LOADED, SIGNIN_SUCCESS, SIGNIN_FAILED, SIGNUP_SUCCESS, SIGNUP_FAILED, SIGNOUT } from './config';

/**
 * @description
 *  Get user info with token from server.
 */
export const loadUser = () => async dispatch => {
    await authService.loadUser().then((data) => {
        dispatch({ type: USER_LOADED, data })
    }).catch((err) => {
        dispatch({ type: SIGNOUT })
    })
}

/**
 * @description
 *  Sign in the user
 */
export const signin = (formData) => dispatch => {
    return new Promise((resolve, reject) => {
        authService.signin(formData).then((data) => {
            dispatch({ type: SIGNIN_SUCCESS, data });
            resolve()
        }).catch((err) => {
            err = err?.response?.data;
            dispatch({ type: SIGNIN_FAILED, err });
            reject()
        })
    })
}

/**
 * @description
 *  Sign in the user by google account.
 */
export const signinGoogle = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        authService.signinGoogle(data).then((data) => {
            dispatch({ type: SIGNIN_SUCCESS, data });
            resolve()
        }).catch((err) => {
            err = err?.response?.data;
            dispatch({ type: SIGNIN_FAILED, err });
            reject()
        })
    })
}

/**
 * @description
 *  Sign up the user
 */
export const signup = (formData) => dispatch => {
    return new Promise((resolve, reject) => {
        authService.signup(formData).then((data) => {
            console.log(data);
            dispatch({ type: SIGNUP_SUCCESS, data })
            resolve();
        }).catch((err) => {
            err = err?.response?.data
            console.log(err);
            dispatch({ type: SIGNUP_FAILED, err });
            reject();
        })
    })
}

/**
 * @description
 *  Sign out user
 */
export const signout = () => async dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({ type: SIGNOUT });
        resolve();
    });
}