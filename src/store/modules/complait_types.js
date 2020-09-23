import axiosInit from '@/utils/axios_init'
export default {
  state: {
    complaitTypes: [],
    loadcomplaitTypes: false,
    pagination: {}
  },
  getters: {
    allcomplaitTypes: (state) => state.complaitTypes,
    loadcomplaitTypes: (state) => state.loadcomplaitTypes,
    paginationcomplaitTypes: (state) => state.pagination
  },
  mutations: {
    GET_ALL_COMPLAIT_TYPES(state, payload) {
      state.complaitTypes = payload
    },
    GET_LOAD_COMPLAIT_TYPES(state, payload) {
      state.loadcomplaitTypes = payload
    },
    GET_COMPLAIT_TYPES_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllComplaitTypes({ commit }, payload) {
      return new Promise((resolve, reject) => {
        // let { pagination, search } = payload
        commit('GET_LOAD_COMPLAIT_TYPES', true)
        // axios
        axiosInit.get('/admin/complait-types'
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
            commit('GET_ALL_COMPLAIT_TYPES', res.data)
          })
          .catch(error => {
            reject(error)
            this.$message.error(error.message)
          })
          .finally(() => {
            commit('GET_LOAD_COMPLAIT_TYPES', false)
          })
      })
    },
    // updateCourier({ commit }, payload) {
    //   return new Promise((resolve, reject) => {
    //     axiosInit.put(`/admin/courier/${payload.id}`, payload.data)
    //       .then(res => {
    //         resolve(res)
    //         console.log(res)
    //       })
    //       .catch(error => {
    //         reject(error)
    //         console.log(error.message)
    //       })
    //   })
    // },
    // deleteCourier({ commit }, payload) {
    //   return new Promise((resolve, reject) => {
    //     axiosInit.delete(`/admin/courier/${payload}`)
    //       .then(res => {
    //         resolve()
    //         console.log(res)
    //       })
    //       .catch(error => {
    //         reject(error)
    //         console.log(error.message)
    //       })
    //   })
    // },
    postComplaitTypes({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post('/admin/complait-types', payload).then(res => {
          resolve(res)
          console.log(res)
        })
          .catch(error => {
            reject(error)
          })
      })
    },
    // getCategoryBySlug({ commit }, payload) {
    //   return new Promise((resolve, reject) => {
    //     axiosInit.get(`/vendor-categories/${payload.slug}`, {
    //       lang: payload.lang
    //     }).then(res => {
    //       resolve(res)
    //       console.log(res)
    //     }).catch(err => {
    //       reject(err)
    //     })
    //   })
    // }
  }
}
