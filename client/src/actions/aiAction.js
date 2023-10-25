import AiService from '../services/aiService';

import {
    AI_MAKE_IMG_FAILED,
    AI_MAKE_IMG_START,
    AI_MAKE_IMG_SUCCESS,
    AI_MAKE_IMG_ERROR,
    AI_SET_SETTING
} from './config.js';

/**
 * @description
 *  Call aiService to generate image. 
 */
export const makeAiImage = (aiType, settings) => dispatch => {
    return new Promise((resolve, reject) => {
        const aiService = new AiService();
        dispatch({
            type: AI_MAKE_IMG_START,
            data: {}
        });

        aiService.makeImg(aiType, settings).then((res) => {
            console.log(res);

            if (aiType === 'txt2img') {
                dispatch({
                    type: AI_MAKE_IMG_SUCCESS,
                    data: {
                        res: res,
                        settings: settings
                    }
                });
                resolve(res);
                return;
            } else if (aiType === "getimg") {
                if (res.status === 'succeeded') {
                    resolve(res);
                    return;
                }
            }
            dispatch({
                type: AI_MAKE_IMG_FAILED,
                data: {
                    res: res
                }
            })
            reject(res);
        }).catch(err => {
            dispatch({
                type: AI_MAKE_IMG_ERROR,
                errMsg: err
            });
            reject(err);
        });
    });
}

/**
 * @description
 *  Change setting variables of store
 */
// export const setSetting = (setting) => dispatch => {
//     dispatch({
//         type: AI_SET_SETTING,
//         data: { setting }
//     });
// }

export const setSetting = (payload) => {
    return {
        type: AI_SET_SETTING,
        payload
    }
}