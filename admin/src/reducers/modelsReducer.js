import { FETCH_MODELS, ADD_MODEL, DELETE_MODEL, UPDATE_MODEL, START_LOADING, END_LOADING, CLEAR_ACTION } from '../actions/types';

const initialState = {
    loading: false,
    refresh: false,
    actionType: '',
    models: []
};

export default function modelsReducer(state = initialState, action) {
    switch (action.type) {
        case START_LOADING:
            return { ...state, loading: true };

        case END_LOADING:
            return { ...state, loading: false };

        case FETCH_MODELS:
            return {
                ...state,
                models: action.payload.data,
                currentPage: action.payload.currentPage,
                totalCount: action.payload.totalCount
            };
        case ADD_MODEL:
            return {
                ...state,
                refresh: !state.refresh,
                actionType: 'add'
            }
        case DELETE_MODEL:
            return {
                ...state,
                refresh: !state.refresh,
                actionType: 'delete'
            };
        case UPDATE_MODEL:
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