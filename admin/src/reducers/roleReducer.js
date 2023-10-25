import { FETCH_ROLES, UPDATE_ROLE } from '../actions/types';

const initialState = {
    roles: [],
    refresh: false
};

export default function rolesReducer(state = initialState, action) {
    switch (action.type) {

        case FETCH_ROLES:
            return {
                roles: action.payload
            };

        case UPDATE_ROLE:
            return {
                ...state,
                refresh: !state.refresh,
                roles: state.roles.map((role) => (role._id === action.payload._id ? action.payload : role))
            };

        default:
            return state;
    }
}