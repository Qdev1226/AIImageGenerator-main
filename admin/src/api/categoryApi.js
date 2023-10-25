import http from './http'

class CategoryApi {

    fetchAllCategories = () => {
        return new Promise((resolve, reject) => {
            http.get('/allCategories')
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
        })
    }

    fetchCategories = (searchQuery) => {
        return new Promise((resolve, reject) => {
            http.post('/categories', searchQuery)
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
        })
    }

    addCategory = (categoryData) => {
        return new Promise((resolve, reject) => {
            http.post('/addCategory', categoryData)
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err);
                })
        })
    }

    deleteCategory = (id) => {
        return new Promise((resolve, reject) => {
            http.post('/deleteCategory', { categoryId: id })
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err);
                })
        })
    }

    updateCategory = (updateData) => {
        return new Promise((resolve, reject) => {
            http.post('/updateCategory', updateData)
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err);
                })
        })
    }
}

const categoryApi = new CategoryApi();

export default categoryApi;