import saleApi from '../api/saleApi';
import { FETCH_SALES, DELETE_SALE, START_LOADING, END_LOADING } from './types';

/**
 * @description
 *  get sales
 */

export const fetchSales = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const data = await saleApi.fetchSales(searchQuery);
        dispatch({ type: FETCH_SALES, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }
}

export const deleteSale = (id, snapbarRef) => async (dispatch) => {
    try {
        const result = await saleApi.deleteSale(id)
        snapbarRef.current.showSnackbar({
            show: true,
            type: 'success',
            message: result.msg
        });
        setTimeout(() => dispatch({ type: DELETE_SALE, payload: id }),
        1000)

    } catch (error) {
        console.log(error)
    }
}