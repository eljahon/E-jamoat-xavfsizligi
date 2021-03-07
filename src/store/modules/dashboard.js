import axiosInit from '@/utils/axios_init'
import errorMessage from '@/utils/errorMessage'
export default {
  state: {
    data: []
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    getDashboardTopData({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.get('/admin/dashboard')
          .then(res => {
            resolve(res.data)
            console.log(res)
          })
          .catch(error => {
            reject(error)
            errorMessage(error)
          })
      })
    },
    getDashboardTopProducts({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.get('/admin/dashboard/leader-products')
          .then(res => {
            resolve(res.data)
            console.log(res)
          })
          .catch(error => {
            reject(error)
            errorMessage(error)
          })
      })
    },
    getDashboardTopClients({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.get('/admin/dashboard/leader-clients')
          .then(res => {
            resolve(res.data)
            console.log(res)
          })
          .catch(error => {
            reject(error)
            errorMessage(error)
          })
      })
    },
    getDashboardTopPages({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.get('/admin/dashboard/top-pages')
          .then(res => {
            resolve(res.data)
            console.log(res)
          })
          .catch(error => {
            reject(error)
            errorMessage(error)
          })
      })
    }
  }
}
