import axios from 'axios';
import { SIGNOUT } from '../actions/types';
import store from '../store';

class FilterApi {
    constructor() {
        this.api = axios.create({
            // baseURL: `${process.env.SERVER_URL}/filters`
            baseURL: `http://localhost:5001/api`,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        this.api.interceptors.response.use(
            (res) => res,
            (err) => {
                if (err.response.status === 401) {
                    store.dispatch({ type: SIGNOUT });
                }
                return Promise.reject(err);
            }
        )
    }

    fetchFilters = (searchQuery) => {
        return new Promise((resolve, reject) => {
            this.api.post('/filters', searchQuery)
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
        })
    }

    addFilter = (filterData) => {
        return new Promise((resolve, reject) => {
            this.api.post('/addFilter', filterData)
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err);
                })
        })
    }

    deleteFilter = (id) => {
        return new Promise((resolve, reject) => {
            this.api.post('/deleteFilter', { filterId: id })
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err);
                })
        })
    }

    updateFilter = (updateData) => {
        return new Promise((resolve, reject) => {
            this.api.post('/updateFilter', updateData)
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err);
                })
        })
    }
}

const filterApi = new FilterApi();

export default filterApi;