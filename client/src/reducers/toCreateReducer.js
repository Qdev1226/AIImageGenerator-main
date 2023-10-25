import {
    TO_CREATE_REMIX_PROMPT,
    TO_CREATE_EDIT_PROMPT
} from '../actions/config.js';

const initialState = {
    prompt: "",
    initImg: "",
    isTxtToImg: true,       // true: TxtToImage, false: ImageToImage
    error: null
};

export default function toCreateReducer(state = initialState, action) {
    switch (action.type) {
        case TO_CREATE_REMIX_PROMPT:
            return {
                ...state,
                error: null,
                prompt: action?.data?.prompt,
                isTxtToImg: true
            }
        case TO_CREATE_EDIT_PROMPT:
            return {
                ...state,
                error: null,
                prompt: "",
                initImg: action?.data?.url,
                isTxtToImg: false
            }
        default:
            return state;
    }

}