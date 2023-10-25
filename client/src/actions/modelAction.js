import { 
    CATEGORY_GET_ALL,
    MODEL_GET_BY_CATEGORY
} from "./config.js";

/**
 * @description
 */
export const setAllCates = (categories) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: CATEGORY_GET_ALL, payload: categories });
    });
};

export const setModels = (models) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: MODEL_GET_BY_CATEGORY, payload: models });
    });
}

