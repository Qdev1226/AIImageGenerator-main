import engineApi from '../api/engineApi';
import { FETCH_ALL_ENGINES, FETCH_ENGINES, ADD_ENGINE, UPDATE_ENGINE, START_LOADING, END_LOADING, DELETE_ENGINE, CLEAR_ACTION } from './types';

/**
 * @description
 *  get engines
 */

export const fetchAllEngines = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const data = await engineApi.fetchAllEngines();
        dispatch({ type: FETCH_ALL_ENGINES, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }
}

export const fetchEngines = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const data = await engineApi.fetchEngines(searchQuery);
        dispatch({ type: FETCH_ENGINES, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }
}

export const deleteEngine = (id) => async (dispatch) => {
    try {
        const result = await engineApi.deleteEngine(id)
        dispatch({ type: DELETE_ENGINE, payload: result })
    } catch (error) {
        console.log(error)
    }
}

export const updateEngine = (updateData) => async (dispatch) => {
    try {
        const result = await engineApi.updateEngine(updateData)
        dispatch({ type: UPDATE_ENGINE, payload: result })
    } catch (error) {
        console.log(error)
    }
}

export const addEngine = (engineData) => async (dispatch) => {
    try {
        console.log(engineData)
        const result = await engineApi.addEngine(engineData)
        dispatch({ type: ADD_ENGINE, payload: result })
    } catch (error) {
        console.log(error);
    }
}

export const clearAction = () => async (dispatch) => {
    dispatch({ type: CLEAR_ACTION })
}