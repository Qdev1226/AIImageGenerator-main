import http from './http'

class EngineApi {

    fetchAllEngines = () => {
        return new Promise((resolve, reject) => {
            http.get('/allEngines')
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
        })
    }

    fetchEngines = (searchQuery) => {
        return new Promise((resolve, reject) => {
            http.post('/engines', searchQuery)
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
        })
    }

    addEngine = (engineData) => {
        return new Promise((resolve, reject) => {
            http.post('/addEngine', engineData)
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err);
                })
        })
    }

    deleteEngine = (id) => {
        return new Promise((resolve, reject) => {
            http.post('/deleteEngine', { engineId: id })
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err);
                })
        })
    }

    updateEngine = (updateData) => {
        return new Promise((resolve, reject) => {
            http.post('/updateEngine', updateData)
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err);
                })
        })
    }
}

const engineApi = new EngineApi();

export default engineApi;