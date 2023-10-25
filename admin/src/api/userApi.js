import http from './http'

class UserApi {

    fetchUsers = (searchQuery) => {
        return new Promise((resolve, reject) => {
            http.post('/users', searchQuery)
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
        })
    }

    addUser = (userData) => {
        return new Promise((resolve, reject) => {
            http.post('/addUser', userData)
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err);
                })
        })
    }

    deleteUser = (id) => {
        return new Promise((resolve, reject) => {
            http.post('/deleteUser', { userId: id })
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err);
                })
        })
    }

    updateUser = (updateData) => {
        return new Promise((resolve, reject) => {
            http.post('/updateUser', updateData)
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err);
                })
        })
    }
}

const userApi = new UserApi();

export default userApi;