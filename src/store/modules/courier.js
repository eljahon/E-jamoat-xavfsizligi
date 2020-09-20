import axiosInit from '@/utils/axios_init'
export default {
  state: {
    couriers: [],
    loadCourier: false,
    pagination: {}
  },
  getters: {
    allCouriers: (state) => state.couriers,
    loadCourier: (state) => state.loadCourier,
    paginationCourier: (state) => state.pagination
  },
  mutations: {
    GET_ALL_COURIER(state, payload) {
      state.couriers = payload
    },
    GET_LOAD_COURIER(state, payload) {
      state.loadCourier = payload
    },
    GET_COURIER_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllCouriers({ commit }, payload) {
      return new Promise((resolve, reject) => {
        // let { pagination, search } = payload
        commit('GET_LOAD_COURIER', true)
        // axios
        axiosInit.get('/admin/courier'
          // {
          // limit: pagination.pageSize,
          // offset: (pagination.current - 1) * pagination.pageSize,
          // search: search
          // }
        )
          .then(res => {
            resolve()
            // pagination.total = parseInt(res.count)
            // commit('GET_CATEGORY_PAGINATION', pagination)
            commit('GET_ALL_COURIER', res.data)
          })
          .catch(error => {
            reject(error)
            this.$message.error(error.message)
          })
          .finally(() => {
            commit('GET_LOAD_COURIER', false)
          })
      })
    },
    updateCourier({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.put(`/admin/courier/${payload.id}`, payload.data)
          .then(res => {
            resolve(res)
            console.log(res)
          })
          .catch(error => {
            reject(error)
            console.log(error.message)
          })
      })
    },
    deleteCourier({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.delete(`/admin/courier/${payload}`)
          .then(res => {
            resolve()
            console.log(res)
          })
          .catch(error => {
            reject(error)
            console.log(error.message)
          })
      })
    },
    postCouriers({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post('/admin/courier', payload).then(res => {
          resolve(res)
          console.log(res)
        })
          .catch(error => {
            reject(error)
          })
      })
    },
    getCategoryBySlug({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.get(`/vendor-categories/${payload.slug}`, {
          lang: payload.lang
        }).then(res => {
          resolve(res)
          console.log(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
