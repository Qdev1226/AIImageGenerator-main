import { FETCH_MEMBERSHIPS, UPDATE_MEMBERSHIPS, START_LOADING, END_LOADING, CLEAR_ACTION } from '../actions/types';

const initialState = {
    loading: false,
    actionType: '',
    refresh: false,
    memberships: []
};

export default function membershipReducer(state = initialState, action) {
    switch (action.type) {
        case START_LOADING:
            return { ...state, loading: true };

        case END_LOADING:
            return { ...state, loading: false };

        case FETCH_MEMBERSHIPS:
            return {
                ...state,
                memberships: action.payload.data,
            };

        case UPDATE_MEMBERSHIPS:
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