import axios from 'axios';

class GoogleService {
    constructor() {
        this.service = axios.create({
            baseURL: process.env.REACT_APP_GOOGLE_AUTH_URL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    getUserInfo = (accessToken) => {
        return new Promise((resolve, reject) => {
            this.service.get('/userinfo?access_token=' + accessToken).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        });
    }
}

const service = new GoogleService();

export default service;