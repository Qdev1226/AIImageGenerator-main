import filterApi from '../api/filterApi';
import { FETCH_FILTERS, ADD_FILTER, DELETE_FILTER, UPDATE_FILTER, START_LOADING, END_LOADING } from './types';

/**
 * @description
 *  get filters
 */

export const fetchFilters = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const data = await filterApi.fetchFilters(searchQuery);
        dispatch({ type: FETCH_FILTERS, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }
}

export const deleteFilter =(id, snapbarRef) => async (dispatch) => {
    try {
        const result = await filterApi.deleteFilter(id)
        // dispatch({type: DELETE_FILTER, payload: id})
        snapbarRef.current.showSnackbar({
            show: true,
            type: 'success',
            message: result.msg                 
        });

        setTimeout(() => dispatch({type: DELETE_FILTER, payload: id}),
        1000)
    } catch (error) {
        console.log(error)
    }
}

export const updateFilter =(updateData, snapbarRef) => async (dispatch) => {
    try {
        const result = await filterApi.updateFilter(updateData)
        // dispatch({type: UPDATE_FILTER, payload: result})
        snapbarRef.current.showSnackbar({
            show: true,
            type: 'success',
            message: "New filter updated successfully."
        });
        setTimeout(() => dispatch({type: UPDATE_FILTER, payload: result}),
        1000)
    } catch (error) {
        console.log(error)
    }
}

export const addFilter =(filterData, snapbarRef) => async (dispatch) => {
    try {
        const result = await filterApi.addFilter(filterData)
        // dispatch({ type: ADD_FILTER, payload: result })
        snapbarRef.current.showSnackbar({
            show: true,
            type: 'success',
            message: "New filter created successfully."             
        });
        setTimeout(() => dispatch({ type: ADD_FILTER, payload: result }),
        1000)
    } catch (error) {
        console.log(error);
    }
}