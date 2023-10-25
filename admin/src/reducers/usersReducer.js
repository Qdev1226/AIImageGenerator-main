import { FETCH_USERS, ADD_USER, DELETE_USER, UPDATE_USER, START_LOADING, END_LOADING } from '../actions/types';

const initialState = {
    loading: true,
    refresh: false,
    users: []
};

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case START_LOADING:
            return { ...state, loading: true };

        case END_LOADING: 
            return { ...state, loading: false }

        case FETCH_USERS:
            return {
                ...state,
                users: action.payload.data,
                currentPage: action.payload.currentPage,
                totalCount: action.payload.totalCount
            };
        case ADD_USER:
            return {
                ...state,
                refresh: !state.refresh,
                users: [...state.users, action.payload.newUser],
            }
        case DELETE_USER:
            return { 
                ...state, 
                refresh: !state.refresh,
                users: state.users.filter((user) => user._id !== action.payload) 
            };
        case UPDATE_USER:
            return { 
                ...state, 
                refresh: !state.refresh,
                users: state.users.map((user) => (user._id === action.payload._id ? action.payload : user))
            };
        default:
            return state;
    }
}