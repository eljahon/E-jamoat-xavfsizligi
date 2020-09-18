import request from './request'
const restApi = {
  get (url, params) {
    return new Promise((resolve, reject) => {
      request({
        url: url,
        method: 'GET',
        params: params
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  post (url, data, params) {
    return new Promise((resolve, reject) => {
      request({
        url: url,
        method: 'POST',
        data: data,
        params: params
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  put (url, data, params) {
    return new Promise((resolve, reject) => {
      request({
        url: url,
        method: 'PUT',
        data: data,
        params: params
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  delete (url, params) {
    return new Promise((resolve, reject) => {
      request({
        url: url,
        method: 'DELETE',
        params: params
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
export default restApi
