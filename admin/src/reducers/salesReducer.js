import { FETCH_SALES, DELETE_SALE, START_LOADING, END_LOADING } from '../actions/types';

const initialState = {
    loading: true,
    refresh: false,
    sales: []
};

export default function salesReducer(state = initialState, action) {
    switch (action.type) {
        case START_LOADING:
            return { ...state, loading: true };

        case END_LOADING:
            return { ...state, loading: false };
            
        case FETCH_SALES:
            return {
                ...state,
                sales: action.payload.data,
                totalCount: action.payload.totalCount
            };
        case DELETE_SALE:
            return {
                ...state,
                refresh: !state.refresh,
                sales: state.sales.filter((sale) => sale._id !== action.payload)
            };
        default:
            return state;
    }
}