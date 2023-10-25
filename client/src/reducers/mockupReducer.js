import {
    MOCKUP_IMG_INITIAL,
    MOCKUP_INITIMG_SELECTED,
    MOCKUP_IMG_START,
    MOCKUP_IMG_SUCCESS,
    MOCKUP_IMG_FAILED_GET,
    MOCKUP_IMG_FAILED_MAKE
} from "../actions/config";

const initialState = {
    initImgUrl: "",       // Init image for mockup
    loading: false,
    mockups: null,
    state: MOCKUP_IMG_INITIAL
};

export default function mockupReducer(state = initialState, action) {
    switch (action.type) {
        case MOCKUP_INITIMG_SELECTED:
            return {
                ...state,
                initImgUrl: action?.url,
            }
        case MOCKUP_IMG_START:
            return {
                ...state,
                loading: true,
                state: MOCKUP_IMG_START
            }
        case MOCKUP_IMG_SUCCESS:
            return {
                ...state,
                loading: false,
                mockups: action.mockups,
                state: MOCKUP_IMG_SUCCESS
            }
        case MOCKUP_IMG_FAILED_GET:
            return {
                ...state,
                loading: false,
                state: MOCKUP_IMG_FAILED_GET
            }
        case MOCKUP_IMG_FAILED_MAKE:
            return {
                ...state,
                loading: false,
                state: MOCKUP_IMG_FAILED_MAKE
            }
        default:
            return state;
    }
}