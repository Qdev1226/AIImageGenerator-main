import roleApi from '../api/roleApi';
import { FETCH_ROLES, UPDATE_ROLE } from './types';

/**
 * @description
 *  get roles
 */

export const fetchRoles = () => async (dispatch) => {
    try {
        const data = await roleApi.fetchRoles();
        dispatch({ type: FETCH_ROLES, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const updateRole = (updateData, snapbarRef) => async (dispatch) => {
    try {
        const result = await roleApi.updateRole(updateData)

        console.log(result)

        snapbarRef.current.showSnackbar({
            show: true,
            type: 'success',
            message: "New model updated successfully."
        });
        setTimeout(() => dispatch({ type: UPDATE_ROLE, payload: result }),
            1000)
    } catch (error) {
        console.log(error)
    }
}