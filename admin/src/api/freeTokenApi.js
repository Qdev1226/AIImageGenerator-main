import http from './http'

class FreeTokenApi {

    fetchFreeTokenCount = () => {
        return new Promise((resolve, reject) => {
            http.get('/getFreeTokenCount')
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
        })
    }

    updateFreeTokenCount = (updateData) => {
        return new Promise((resolve, reject) => {
            http.post('/updateFreeTokenCount', updateData)
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err);
                })
        })
    }
}

const freeTokenApi = new FreeTokenApi();

export default freeTokenApi;