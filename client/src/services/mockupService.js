import axios from 'axios';

export default class MockupService {
    constructor() {
        this.createSvc = axios.create({
            baseURL: process.env.REACT_APP_CORS_HEADER + process.env.REACT_APP_PRINTFUL_MOCK_GEN_CREATE_URL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        this.createSvc.defaults.headers.common['Authorization'] = process.env.REACT_APP_PRINTFUL_MOCK_GEN_TOKEN;

        this.getSvc = axios.create({
            baseURL: process.env.REACT_APP_CORS_HEADER + process.env.REACT_APP_PRINTFUL_MOCK_GEN_GET_URL
        });
        this.getSvc.defaults.headers.common['Authorization'] = process.env.REACT_APP_PRINTFUL_MOCK_GEN_TOKEN;
    }

    createTShirt = (mockupType, srcImg) => {
        return new Promise((resolve, reject) => {

            var files = [];
            if (mockupType.front)
                files.push({
                    "placement": "front",
                    "image_url": srcImg,
                    "position": {
                        "area_width": 1800,
                        "area_height": 2400,
                        "width": 1800,
                        "height": 1800,
                        "top": 300,
                        "left": 0
                    }
                });
            if (mockupType.back)
                files.push({
                    "placement": "back",
                    "image_url": srcImg,
                    "position": {
                        "area_width": 1800,
                        "area_height": 2400,
                        "width": 1800,
                        "height": 1800,
                        "top": 300,
                        "left": 0
                    }
                });

            this.createSvc.post(('' + mockupType.productId), {
                // "variant_ids": [4012, 4013, 4014, 4017, 4018, 4019],
                "variant_ids": mockupType.variantIds,
                "format": "jpg",
                "files": files
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        })
    }

    getTShirt = (taskKey) => {
        return new Promise((resolve, reject) => {
            this.getSvc.get(`?task_key=` + taskKey).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            })
        })
    }
}