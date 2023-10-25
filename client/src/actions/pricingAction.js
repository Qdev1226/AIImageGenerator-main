import apiService from '../services/apiService.js';

import {
    ROLE_GET_ALL_START,
    ROLE_GET_ALL_SUCCESS,
    ROLE_GET_ALL_FAILED,
} from './config.js';

/**
 * @description
 *  Get all roles
 */
export const getAllRoles = () => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({ type: ROLE_GET_ALL_START });
        apiService.getAllRoles().then((data) => {
            dispatch({ type: ROLE_GET_ALL_SUCCESS, data });
            resolve()
        }).catch((err) => {
            err = err?.response?.data;
            dispatch({ type: ROLE_GET_ALL_FAILED, err });
            reject()
        })
    })
}