import { FETCH_FILTERS, ADD_FILTER, DELETE_FILTER, UPDATE_FILTER, START_LOADING, END_LOADING } from '../actions/types';

const initialState = {
    loading: true,
    refresh: false,
    filters: []
};

export default function filtersReducer(state = initialState, action) {
    switch (action.type) {
        case START_LOADING:
            return { ...state, loading: true };

        case END_LOADING:
            return { ...state, loading: false };
            
        case FETCH_FILTERS:
            return {
                ...state,
                filters: action.payload.data,
                currentPage: action.payload.currentPage,
                totalCount: action.payload.totalCount
            };
        case ADD_FILTER:
            return {
                ...state,
                refresh: !state.refresh,
                filters: [...state.filters, action.payload.newFilter],
            }
        case DELETE_FILTER:
            return { 
                ...state, 
                refresh: !state.refresh,
                filters: state.filters.filter((filter) => filter._id !== action.payload) 
            };
        case UPDATE_FILTER:
            return { 
                ...state, 
                refresh: !state.refresh,
                filters: state.filters.map((filter) => (filter._id === action.payload._id ? action.payload : filter))
            };
        default:
            return state;
    }
}