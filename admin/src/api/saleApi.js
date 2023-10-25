import axios from 'axios';
import { SIGNOUT } from '../actions/types';
import store from '../store';

class SaleApi {
    constructor() {
        this.api = axios.create({
            // baseURL: `${process.env.SERVER_URL}/sales`
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

    fetchSales = (searchQuery) => {
        return new Promise((resolve, reject) => {
            this.api.post('/sales', searchQuery)
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
        })
    }
    
    deleteSale = (id) => {
        return new Promise((resolve, reject) => {
            this.api.post('/deleteSale', {_id: id})
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err);
                })
        })
    }
}

const saleApi = new SaleApi();

export default saleApi;