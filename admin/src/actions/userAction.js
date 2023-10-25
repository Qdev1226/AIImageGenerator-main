import userApi from '../api/userApi';
import { FETCH_USERS, DELETE_USER, START_LOADING, END_LOADING } from './types';

/**
 * @description
 *  get users
 */

export const fetchUsers = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const data = await userApi.fetchUsers(searchQuery);
        dispatch({ type: FETCH_USERS, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = (id, snapbarRef) => async (dispatch) => {
    try {
        const result = await userApi.deleteUser(id)
        // dispatch({type: DELETE_USER, payload: id})
        snapbarRef.current.showSnackbar({
            show: true,
            type: 'success',
            message: result.msg
        });

        setTimeout(() => dispatch({ type: DELETE_USER, payload: id }),
            1000)
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = (updateData, snapbarRef) => async (dispatch) => {
    try {
        const result = await userApi.updateUser(updateData)
        // dispatch({type: UPDATE_USER, payload: result})
        snapbarRef.current.showSnackbar({
            show: true,
            type: 'success',
            message: "User updated successfully."
        });
        setTimeout(() => dispatch({ type: UPDATE_USER, payload: result }),
            1000)
    } catch (error) {
        console.log(error)
    }
}
