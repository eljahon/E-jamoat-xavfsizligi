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
    getAllDeliveryTypes ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let { pagination } = payload
        commit('GET_LOAD_DELIVERY_TYPES', true)
        // axios
        axiosInit.get('/admin/delivery-type',
          {
            page: pagination.current
          }
        )
          .then(res => {
            resolve()
            pagination.total = parseInt(res.links.total)
            commit('GET_DELIVERY_TYPES_PAGINATION', pagination)
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
    updateDeliveryType ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.put(`/admin/delivery-type/${payload.id}`, payload.data)
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
    deleteDeliveryTypes ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.delete(`/admin/delivery-type/${payload}`)
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
    postDeliveryTypes ({ commit }, payload) {
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
    getDeliveryTypesList ({ commit }) {
      return new Promise((resolve, reject) => {
        axiosInit.get('/admin/delivery-type/list').then(res => {
          resolve(res)
          console.log(res)
        })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
