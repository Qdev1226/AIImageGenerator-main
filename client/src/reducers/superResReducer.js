import {
    SUP_RESOLUTION_INITIMG_SELECTED,
    SUP_RESOLUTION_IMG_INITIAL,
    SUP_RESOLUTION_IMG_START,
    SUP_RESOLUTION_IMG_SUCCESS,
    SUP_RESOLUTION_IMG_FAILED
} from "../actions/config";

const initialState = {
    initImgUrl: "",       // Init image for mockup
    loading: false,
    result: "",
    error: "",
    state: SUP_RESOLUTION_IMG_INITIAL
};

export default function superResReducer(state = initialState, action) {
    switch (action.type) {
        case SUP_RESOLUTION_INITIMG_SELECTED:
            return {
                ...state,
                initImgUrl: action?.url,
            }
        case SUP_RESOLUTION_IMG_START:
            return {
                ...state,
                loading: true,
                state: SUP_RESOLUTION_IMG_START
            }
        case SUP_RESOLUTION_IMG_SUCCESS:
            return {
                ...state,
                loading: false,
                state: SUP_RESOLUTION_IMG_SUCCESS,
                result: action?.data?.output
            }
        case SUP_RESOLUTION_IMG_FAILED:
            return {
                ...state,
                loading: false,
                state: SUP_RESOLUTION_IMG_FAILED,
                error: action?.err
            }
        default:
            return state;
    }
}