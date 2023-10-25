import axios from 'axios';

class RevolutService {
    constructor() {
        this.service = axios.create({
            baseURL: process.env.REACT_APP_CORS_HEADER + process.env.REACT_APP_REVOLUT_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.REACT_APP_REVOLUT_TOKEN
            }
        });
    }

    createOrder = (data) => {
        return new Promise((resolve, reject) => {
            this.service.post('/orders', data).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        })
    }
}

const service = new RevolutService();

export default service;