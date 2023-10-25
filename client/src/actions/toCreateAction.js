import {
    TO_CREATE_REMIX_PROMPT,
    TO_CREATE_EDIT_PROMPT
} from './config.js';

/**
 * @description
 *  Remix the prompt
 */
export const remixPrompt = (prompt) => dispatch => {
    return new Promise((resolve, reject) => {
        const data = {
            prompt: prompt
        };
        dispatch({ type: TO_CREATE_REMIX_PROMPT, data });
        resolve()
    })
}

/**
 * @description
 *  Edit the image item
 */
export const editItem = (url) => dispatch => {
    return new Promise((resolve, reject) => {
        const data = {
            url: url
        };
        dispatch({ type: TO_CREATE_EDIT_PROMPT, data });
        resolve()
    })
}