import apiService from '../services/apiService.js';

import {
    IMG_CREATE_START,
    IMG_CREATE_SUCCESS,
    IMG_CREATE_FAILED,
    IMG_SEARCH_SUCCESS,
    IMG_SEARCH_FAILED,
    IMG_FAV_SUCCESS,
    IMG_GET_BY_ID_SUCCESS,
    IMG_FOLLOW_AUTHOR,
    IMG_MAKE_PRIVATE_SUCCESS
} from './config.js';

/**
 * @description
 *  Search image by keyword
 */
export const searchImgsByKey = (keyword) => dispatch => {
    return new Promise((resolve, reject) => {
        apiService.searchImgsByKey(keyword)
            .then((data) => {
                data.keyword = keyword;
                dispatch({ type: IMG_SEARCH_SUCCESS, data });
                resolve()
            })
            .catch((err) => {
                err = err?.response?.data;
                dispatch({ type: IMG_SEARCH_FAILED, err });
                reject()
            })
    })
}

/**
 * @description
 *  Create image items.
 */
export const createImg = (imgData) => dispatch => {
    dispatch({ type: IMG_CREATE_START })

    return new Promise((resolve, reject) => {
        apiService.createImg(imgData).then((images) => {
            dispatch({ type: IMG_CREATE_SUCCESS, images });
            resolve();
        }).catch((err) => {
            dispatch({ type: IMG_CREATE_FAILED, err });
            reject();
        });
    });
}

export const addFavourite = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        apiService.addFavourite(data)
            .then(data => {
                dispatch({ type: IMG_FAV_SUCCESS, data });
                resolve(data);
            })
            .catch(err => {
                reject();
            });
    })
}

export const getImageById = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        apiService.getImageById(data)
            .then(data => {
                dispatch({ type: IMG_GET_BY_ID_SUCCESS, data });
                resolve();
            })
            .catch(err => {
                reject();
            });
    })
}

export const followImgAuthor = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        apiService.followImgAuthor(data)
            .then(data => {
                dispatch({ type: IMG_FOLLOW_AUTHOR, data });
                resolve();
            })
            .catch(err => {
                reject();
            });
    })
}

/**
 * @description
 *  Make image to private in recent images(store) 
 */
export const changeRecentImgs = (payload) => {
    return {
        type: IMG_MAKE_PRIVATE_SUCCESS,
        payload
    }
}