import modelApi from '../api/modelApi';
import { FETCH_MODELS, ADD_MODEL, UPDATE_MODEL, START_LOADING, END_LOADING, DELETE_MODEL, CLEAR_ACTION } from './types';

/**
 * @description
 *  get models
 */

export const fetchModels = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const data = await modelApi.fetchModels(searchQuery);
        dispatch({ type: FETCH_MODELS, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }
}

export const deleteModel = (id) => async (dispatch) => {
    try {
        const result = await modelApi.deleteModel(id)
        dispatch({ type: DELETE_MODEL, payload: result })
    } catch (error) {
        console.log(error)
    }
}

export const updateModel = (updateData) => async (dispatch) => {
    try {
        const result = await modelApi.updateModel(updateData)
        dispatch({ type: UPDATE_MODEL, payload: result })
    } catch (error) {
        console.log(error)
    }
}

export const addModel = (modelData) => async (dispatch) => {
    try {
        const result = await modelApi.addModel(modelData)
        dispatch({ type: ADD_MODEL, payload: result })
    } catch (error) {
        console.log(error);
    }
}

export const clearAction = () => async (dispatch) => {
    dispatch({ type: CLEAR_ACTION })
}