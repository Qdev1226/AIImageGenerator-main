import {
    IMG_CREATE_START,
    IMG_CREATE_SUCCESS,
    IMG_CREATE_FAILED,
    IMG_SEARCH_SUCCESS,
    IMG_SEARCH_FAILED,
    IMG_FAV_SUCCESS,
    IMG_GET_BY_ID_SUCCESS,
    IMG_FOLLOW_AUTHOR
} from "../actions/config";

const initialState = {
    loading: false,
    imgSchKeyword: "",      // Search keyword
    recentImages: [],       // Generated results
    images: [],             // Search results
    image: null,            // Chosen image
    imageIsFav: false,      // Chosen image favourite state.
    imageFavCnt: 0,         // Chosen image favourite count.
    imageIsFollow: false,    // Chosen image author is my follower?
    error: null,
    mockupInitImg: ""       // Init image for mockup
};

export default function imgReducer(state = initialState, action) {
    switch (action.type) {
        case IMG_CREATE_START:
            return {
                ...state,
                loading: true
            }
        case IMG_CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                recentImages: action?.images
            }
        case IMG_CREATE_FAILED:
            return {
                ...state,
                loading: false,
            }
        case IMG_SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                images: action?.data?.images,
                img: null,
                imgSchKeyword: action?.data?.keyword
            }
        case IMG_SEARCH_FAILED:
            return {
                ...state,
                loading: false,
                images: null,
                error: action?.data?.error
            };
        case IMG_GET_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                image: action?.data?.image,
                imageIsFav: action?.data?.isFav,
                imageFavCnt: action?.data?.image?.fav_count,
                imageIsFollow: action?.data?.isFollow
            }
        case IMG_FAV_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                image: action?.data?.image,
                imageIsFav: action?.data?.isFav,
                imageFavCnt: action?.data?.image?.fav_count
            }
        case IMG_FOLLOW_AUTHOR:
            return {
                ...state,
                loading: false,
                error: null,
                imageIsFollow: action?.data?.isFollow
            }
        default:
            return state;
    }
}