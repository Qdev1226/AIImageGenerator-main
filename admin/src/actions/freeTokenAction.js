import freeTokenApi from '../api/freeTokenApi';
import { FETCH_FREE_TOKEN_COUNT, UPDATE_FREE_TOKEN_COUNT, CLEAR_ACTION } from './types';

/**
 * @description
 *  get free token count
 */

export const fetchFreeTokenCount = () => async (dispatch) => {
    try {
        const data = await freeTokenApi.fetchFreeTokenCount();
        dispatch({ type: FETCH_FREE_TOKEN_COUNT, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const updateFreeTokenCount = (updateData) => async (dispatch) => {
    try {
        const result = await freeTokenApi.updateFreeTokenCount(updateData)
        dispatch({ type: UPDATE_FREE_TOKEN_COUNT, payload: result })
    } catch (error) {
        console.log(error)
    }
}

export const clearAction = () => async (dispatch) => {
    dispatch({ type: CLEAR_ACTION })
}