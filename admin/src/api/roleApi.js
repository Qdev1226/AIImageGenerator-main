import axios from 'axios';
import { SIGNOUT } from '../actions/types';
import store from '../store';

class RoleApi {
    constructor() {
        this.api = axios.create({
            // baseURL: `${process.env.SERVER_URL}/users`
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

    fetchRoles = () => {
        return new Promise((resolve, reject) => {
            this.api.post('/roles', )
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
        })
    }

    updateRole = (updateData) => {
        return new Promise((resolve, reject) => {
            this.api.post('/updateRole', updateData)
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err);
                })
        })
    }
}

const roleApi = new RoleApi();

export default roleApi;