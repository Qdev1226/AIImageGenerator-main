import MockupService from '../services/mockupService';

import {
    MOCKUP_INITIMG_SELECTED,
    MOCKUP_IMG_START,
    MOCKUP_IMG_SUCCESS,
    MOCKUP_IMG_FAILED_GET,
    MOCKUP_IMG_FAILED_MAKE
} from './config.js';

/**
 * @description
 *  Set Mockup initial image url when user clicked the image. 
 */
export const setMockupChosenImgUrl = (url) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({ type: MOCKUP_INITIMG_SELECTED, url });
        resolve();
    });
}

/**
 * @description
 *  Mockup Image with given url and mockup type..
 */
export const mockupImage = (mockupType, srcImg) => dispatch => {
    return new Promise((resolve, reject) => {
        const mockupService = new MockupService();
        dispatch({ type: MOCKUP_IMG_START });

        mockupService.createTShirt(mockupType, srcImg).then((res) => {
            if (res.code === 200) { // If Success
                setTimeout(() => {
                    mockupService.getTShirt(res.result.task_key).then((res) => {
                        if (res.code === 200 && res.result.status === "completed") {
                            dispatch({ type: MOCKUP_IMG_SUCCESS, mockups: res.result.mockups });
                            return;
                        }
                        dispatch({ type: MOCKUP_IMG_FAILED_GET });
                    }).catch(err => {
                        dispatch({ type: MOCKUP_IMG_FAILED_GET });
                    })
                }, 10000);  // Delay 10s
                return;
            }

            dispatch({ type: MOCKUP_IMG_FAILED_MAKE });
        }).catch(err => dispatch({ type: MOCKUP_IMG_FAILED_MAKE }));
    });
}