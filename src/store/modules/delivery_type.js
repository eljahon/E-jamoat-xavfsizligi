import axiosInit from '@/utils/axios_init'
export default {
  state: {
    deliveryTypes: [],
    loadDeliveryTypes: false,
    pagination: {}
  },
  getters: {
    alldeliveryTypes: (state) => state.deliveryTypes,
    loadDeliveryTypes: (state) => state.loadDeliveryTypes,
    paginationDeliveryTypes: (state) => state.pagination
  },
  mutations: {
    GET_ALL_DELIVERY_TYPES(state, payload) {
      state.deliveryTypes = payload
    },
    GET_LOAD_DELIVERY_TYPES(state, payload) {
      state.loadDeliveryTypes = payload
    },
    GET_DELIVERY_TYPES_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllDeliveryTypes({ commit }, payload) {
      return new Promise((resolve, reject) => {
        // let { pagination, search } = payload
        commit('GET_LOAD_DELIVERY_TYPES', true)
        // axios
        axiosInit.get('/admin/delivery-type'
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
            commit('GET_ALL_DELIVERY_TYPES', res.data)
          })
          .catch(error => {
            reject(error)
            this.$message.error(error.message)
          })
          .finally(() => {
            commit('GET_LOAD_DELIVERY_TYPES', false)
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
    postDeliveryTypes({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post('/admin/delivery-type', payload).then(res => {
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
