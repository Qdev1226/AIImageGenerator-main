import axios from 'axios';
import { SIGNOUT } from '../actions/config';
import store from '../store';

class AuthService {
    constructor() {
        this.service = axios.create({
            baseURL: 'https://revolutionai.azurewebsites.net/users',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        this.service.interceptors.response.use(
            (res) => res,
            (err) => {
                if (err.response.status === 401) {
                    store.dispatch({ type: SIGNOUT });
                }
                return Promise.reject(err);
            }
        )
    }

    loadUser = () => {
        return new Promise((resolve, reject) => {
            this.service.get('/').then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }

    signin = (formData) => {
        return new Promise((resolve, reject) => {
            this.service.post('/signin', formData).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            })
        })
    }

    signup = (formData) => {
        return new Promise((resolve, reject) => {
            this.service.post('/signup', formData).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err);
            })
        })
    }

    signinGoogle = (data) => {
        return new Promise((resolve, reject) => {
            this.service.post('/signin_google', data).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    }

    signout = () => {
        return new Promise((resolve, reject) => {
            this.service.post('/signout').then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err);
            })
        })
    }

    setTokenInHeader = (token) => {
        this.service.defaults.headers.common['x-auth-token'] = token;
    }

    removeTokenInHeader = () => {
        delete this.service.defaults.headers.common['x-auth-token'];
    }
}

const service = new AuthService();

export default service;