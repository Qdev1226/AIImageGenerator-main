import http from './http'

class MembershipApi {

    fetchMemberships = () => {
        return new Promise((resolve, reject) => {
            http.get('/getMemberships')
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
        })
    }

    updateMemberships = (updateData) => {
        return new Promise((resolve, reject) => {
            http.post('/updateMemberships', updateData)
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err);
                })
        })
    }
}

const membershipApi = new MembershipApi();

export default membershipApi;