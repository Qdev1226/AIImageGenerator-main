import {
    ROLE_GET_ALL_START,
    ROLE_GET_ALL_SUCCESS,
    ROLE_GET_ALL_FAILED,
} from '../actions/config.js';

const initialState = {
    loading: false,
    roles: [],
};

export default function pricingReducer(state = initialState, action) {
    switch (action.type) {
        case ROLE_GET_ALL_START:
            return {
                ...state,
                loading: true,
            }
        case ROLE_GET_ALL_SUCCESS:
            return {
                ...state,
                loading: false,
                roles: action.data?.roles
            }
        case ROLE_GET_ALL_FAILED:
            return {
                ...state,
                loading: false,
            }
        default:
            return {
                ...state
            }
    }
}