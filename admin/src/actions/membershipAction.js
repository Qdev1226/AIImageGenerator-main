import membershipApi from '../api/membershipApi';
import { FETCH_MEMBERSHIPS, UPDATE_MEMBERSHIPS, CLEAR_ACTION } from './types';

/**
 * @description
 *  get free token count
 */

export const fetchMemberships = () => async (dispatch) => {
    try {
        const data = await membershipApi.fetchMemberships();
        dispatch({ type: FETCH_MEMBERSHIPS, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const updateMemberships = (updateData) => async (dispatch) => {
    try {
        const result = await membershipApi.updateMemberships(updateData)
        dispatch({ type: UPDATE_MEMBERSHIPS, payload: result })
    } catch (error) {
        console.log(error)
    }
}

export const clearAction = () => async (dispatch) => {
    dispatch({ type: CLEAR_ACTION })
}