import categoryApi from '../api/categoryApi';
import { FETCH_ALL_CATEGORIES, FETCH_CATEGORIES, ADD_CATEGORY, UPDATE_CATEGORY, START_LOADING, END_LOADING, DELETE_CATEGORY, CLEAR_ACTION } from './types';

/**
 * @description
 *  get categories
 */

export const fetchAllCategories = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const data = await categoryApi.fetchAllCategories();
        dispatch({ type: FETCH_ALL_CATEGORIES, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }
}

export const fetchCategories = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const data = await categoryApi.fetchCategories(searchQuery);
        dispatch({ type: FETCH_CATEGORIES, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }
}

export const deleteCategory = (id) => async (dispatch) => {
    try {
        const result = await categoryApi.deleteCategory(id)
        dispatch({ type: DELETE_CATEGORY, payload: result })
    } catch (error) {
        console.log(error)
    }
}

export const updateCategory = (updateData) => async (dispatch) => {
    try {
        const result = await categoryApi.updateCategory(updateData)
        dispatch({ type: UPDATE_CATEGORY, payload: result })
    } catch (error) {
        console.log(error)
    }
}

export const addCategory = (categoryData) => async (dispatch) => {
    try {
        const result = await categoryApi.addCategory(categoryData)
        dispatch({ type: ADD_CATEGORY, payload: result })
    } catch (error) {
        console.log(error);
    }
}

export const clearAction = () => async (dispatch) => {
    dispatch({ type: CLEAR_ACTION })
}