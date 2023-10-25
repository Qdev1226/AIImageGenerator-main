import { USER_LOADED, SIGNIN_SUCCESS, SIGNIN_FAILED, SIGNUP_SUCCESS, SIGNUP_FAILED, SIGNOUT } from '../actions/config';
import setAuthToken from '../utils/setAuthToken';

const initialState = {
    isAuthenticated: false,
    token: localStorage.getItem('token'),
    user: null,
    loading: true,
    error: null
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case USER_LOADED:
        case SIGNIN_SUCCESS:
            setAuthToken(action?.data?.token)
            return {
                ...state,
                user: action?.data?.user,
                loading: false,
                isAuthenticated: true,
                error: null
            };
        case SIGNIN_FAILED:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action?.err
            }
        case SIGNUP_SUCCESS:
            setAuthToken(action?.data?.token)
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action?.data?.user,
                error: null,
            }
        case SIGNUP_FAILED:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action?.err
            }
        case SIGNOUT:
            setAuthToken(null);
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: null,
                token: null
            }
        default:
            return state;
    }
}