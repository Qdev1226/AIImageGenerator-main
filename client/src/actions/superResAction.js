import AiService from '../services/aiService';

import {
    SUP_RESOLUTION_INITIMG_SELECTED,
    SUP_RESOLUTION_IMG_START,
    SUP_RESOLUTION_IMG_SUCCESS,
    SUP_RESOLUTION_IMG_FAILED
} from './config.js';

/**
 * @description
 *  Set super resolution initial image url when user clicked the image. 
 */
export const setSuperResInitImg = (url) => dispatch => {
    dispatch({ type: SUP_RESOLUTION_INITIMG_SELECTED, url });
}

/**
 * @description
 *  Call aiService to make super resolution image. 
 */
export const makeSuperResolution = (settings) => dispatch => {
    return new Promise((resolve, reject) => {
        const aiService = new AiService();
        dispatch({ type: SUP_RESOLUTION_IMG_START });

        aiService.superResolution(settings).then((res) => {
            if (res.status === 'success') {
                dispatch({ type: SUP_RESOLUTION_IMG_SUCCESS, data: res });
                resolve(res);
                return;
            }

            dispatch({ type: SUP_RESOLUTION_IMG_FAILED, err: res.messege });
            reject(res.messege);
        }).catch(err => {
            dispatch({ type: SUP_RESOLUTION_IMG_FAILED, err: err });
            reject(err);
        });
    });
}