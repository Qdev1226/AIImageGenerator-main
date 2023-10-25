import authApi from '../api/authApi';
import { 
    USER_LOADED, 
    SIGNIN_SUCCESS, 
    SIGNIN_FAILED, 
    SIGNUP_SUCCESS, 
    SIGNUP_FAILED, 
    SIGNOUT 
} from './types';

// import 

/**
 * @description
 *  Get user info with token from server.
 */
export const loadUser = () => async dispatch => {
    await authApi.loadUser()
        .then((data) => {
            dispatch({ type: USER_LOADED, data })
        })
        .catch((err) => {
            dispatch({ type: SIGNOUT })
        })
}

/**
 * @description
 *  Sign in the user
 */
export const signin = (formData, snapbarRef) => dispatch => {
    return new Promise((resolve, reject) => {
        authApi.signin(formData)
            .then((data) => {
                dispatch({ type: SIGNIN_SUCCESS, data });
                resolve()
            })
            .catch((err) => {
                console.log(err);
                dispatch({ type: SIGNIN_FAILED, err });
                snapbarRef.current.showSnackbar({
                    show: true,
                    type: 'error',
                    message: err?.response?.data?.msg                 
                });
                reject()
            })
    })
}

/**
 * @description
 *  Sign up the user
 */
export const signup = (formData, snapbarRef) => dispatch => {
    console.log(formData);
    return new Promise((resolve, reject) => {
        authApi.signup(formData)
            .then((data) => {
                dispatch({ type: SIGNUP_SUCCESS, data })
                resolve();
            })
            .catch((err) => {
                dispatch({ type: SIGNUP_FAILED, err });
                snapbarRef.current.showSnackbar({
                    show: true,
                    type: 'error',
                    message: err?.response?.data?.msg                 
                });
                reject();
            })
    })
}

/**
 * @description
 *  Sign out user
 */
export const signout = () => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({ type: SIGNOUT });
        resolve();
    });
}