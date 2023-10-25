import { FETCH_FREE_TOKEN_COUNT, UPDATE_FREE_TOKEN_COUNT, START_LOADING, END_LOADING, CLEAR_ACTION } from '../actions/types';

const initialState = {
    actionType: '',
    refresh: false,
    count: 0
};

export default function defaultTokenReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_FREE_TOKEN_COUNT:
            return {
                ...state,
                count: action.payload.data,
            };

        case UPDATE_FREE_TOKEN_COUNT:
            return {
                ...state,
                actionType: 'update',
                refresh: !state.refresh,
            };
        case CLEAR_ACTION:
            return {
                ...state,
                actionType: ''
            };
        default:
            return state;
    }
}