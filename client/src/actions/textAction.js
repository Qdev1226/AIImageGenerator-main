import { 
    GENERATED_TEXT_RESULT,
    TEXT_SESSION
} from "./config.js";

/**
 * @description
 */
export const setGeneratedText = (choices) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: GENERATED_TEXT_RESULT, payload: choices });
    });
};

/**
 * @description
 * User's text generation history list
 */
export const setTextSessionHistory = (history) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: TEXT_SESSION, payload: history });
    })
}


