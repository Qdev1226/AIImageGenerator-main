import axios from "axios";
const getToken = () => {
    return window.localStorage.getItem("token") ? localStorage.getItem("token") : null;
}

const http = axios.create({
    baseURL: "http://localhost:5001/api/",
    // baseURL: "https://answersheet.au/api/v1/",
    timeout: 15000,
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

http.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
});
http.interceptors.response.use(function (response) {
    return response;
}, function (err) {
    if (err.response.status === 401 || err.response.status === 403 || err.response.status === 406) {
        window.localStorage.clear();
        window.location.href = "/login";
    }
    return Promise.reject(err);
});

export default http;