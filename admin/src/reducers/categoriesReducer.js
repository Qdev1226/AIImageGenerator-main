import { FETCH_ALL_CATEGORIES, FETCH_CATEGORIES, ADD_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY, START_LOADING, END_LOADING, CLEAR_ACTION } from '../actions/types';

const initialState = {
    loading: false,
    refresh: false,
    actionType: '',
    categories: []
};

export default function categoriesReducer(state = initialState, action) {
    switch (action.type) {
        case START_LOADING:
            return { ...state, loading: true };

        case END_LOADING:
            return { ...state, loading: false };

        case FETCH_ALL_CATEGORIES:
            return {
                ...state,
                categories: action.payload.data,
            };

        case FETCH_CATEGORIES:
            return {
                ...state,
                categories: action.payload.data,
                currentPage: action.payload.currentPage,
                totalCount: action.payload.totalCount
            };
        case ADD_CATEGORY:
            return {
                ...state,
                refresh: !state.refresh,
                actionType: 'add'
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                refresh: !state.refresh,
                actionType: 'delete'
            };
        case UPDATE_CATEGORY:
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