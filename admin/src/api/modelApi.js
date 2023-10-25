import http from './http'

class ModelApi {

    fetchModels = (searchQuery) => {
        return new Promise((resolve, reject) => {
            http.post('/models', searchQuery)
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
        })
    }

    addModel = (modelData) => {
        return new Promise((resolve, reject) => {
            http.post('/addModel', modelData)
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err);
                })
        })
    }

    deleteModel = (id) => {
        return new Promise((resolve, reject) => {
            console.log(id)
            http.post('/deleteModel', { modelId: id })
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err);
                })
        })
    }

    updateModel = (updateData) => {
        return new Promise((resolve, reject) => {
            http.post('/updateModel', updateData)
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err);
                })
        })
    }
}

const modelApi = new ModelApi();

export default modelApi;