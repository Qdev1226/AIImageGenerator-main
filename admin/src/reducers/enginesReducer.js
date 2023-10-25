import { FETCH_ALL_ENGINES, FETCH_ENGINES, ADD_ENGINE, DELETE_ENGINE, UPDATE_ENGINE, START_LOADING, END_LOADING, CLEAR_ACTION } from '../actions/types';

const initialState = {
    loading: false,
    refresh: false,
    actionType: '',
    engines: []
};

export default function enginesReducer(state = initialState, action) {
    switch (action.type) {
        case START_LOADING:
            return { ...state, loading: true };

        case END_LOADING:
            return { ...state, loading: false };

        case FETCH_ALL_ENGINES:
            return {
                ...state,
                engines: action.payload.data,
            };

        case FETCH_ENGINES:
            return {
                ...state,
                engines: action.payload.data,
                currentPage: action.payload.currentPage,
                totalCount: action.payload.totalCount
            };
        case ADD_ENGINE:
            return {
                ...state,
                refresh: !state.refresh,
                actionType: 'add'
            }
        case DELETE_ENGINE:
            return {
                ...state,
                refresh: !state.refresh,
                actionType: 'delete'
            };
        case UPDATE_ENGINE:
            return {
                ...state,
                refresh: !state.refresh,
                actionType: 'update'
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