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
        axiosInit.get('/admin/dashboard', {
          to: payload.to,
          from: payload.from
        })
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
        axiosInit.get('/admin/dashboard/leader-products', {
          to: payload.to,
          from: payload.from
        })
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
        axiosInit.get('/admin/dashboard/leader-clients', {
          to: payload.to,
          from: payload.from
        })
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
        axiosInit.get('/admin/dashboard/top-pages', {
          to: payload.to,
          from: payload.from
        })
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
    getDashboardAllCharts({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.get('/admin/dashboard/charts', {
          to: payload.to,
          from: payload.from
        })
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
  }
}
