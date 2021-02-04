import axiosInit from '@/utils/axios_init'
export default {
  state: {
    orders: [],
    loadOrder: false,
    status: [],
    pagination: {}
  },
  getters: {
    allOrders: (state) => state.orders,
    orderStatus: (state) => state.status,
    loadOrder: (state) => state.loadOrder,
    paginationOrder: (state) => state.pagination
  },
  mutations: {
    GET_ALL_ORDER(state, payload) {
      state.orders = payload
    },
    GET_ALL_ORDER_STATUS(state, payload) {
      state.status = payload
    },
    GET_LOAD_ORDER(state, payload) {
      state.loadOrder = payload
    },
    GET_ORDER_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllOrder({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let { pagination, search } = payload
        commit('GET_LOAD_ORDER', true)
        // axios
        axiosInit.get('/orders', {
          limit: pagination.pageSize,
          offset: (pagination.current - 1) * pagination.pageSize,
          vendor_id: '5f50b5b8ac4f380011954421',
          search: search
        })
          .then(res => {
            resolve()
            console.log(res)
            pagination.total = parseInt(res.count)
            commit('GET_ORDER_PAGINATION', pagination)
            commit('GET_ALL_ORDER', res.orders)
          })
          .catch(error => {
            reject(error)
            this.$message.error(error.message)
          })
          .finally(() => {
            commit('GET_LOAD_ORDER', false)
          })
      })
    },
    getOrderById({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit('GET_LOAD_ORDER', true)
        // axios
        axiosInit.get(`/admin/orders/${payload}`)
          .then(res => {
            resolve(res.data)
            // console.log(res)
            // pagination.total = parseInt(res.count)
            // commit('GET_ORDER_PAGINATION', pagination)
            // commit('GET_ALL_ORDER', res.orders)
          })
          .catch(error => {
            reject(error)
            this.$message.error(error.message)
          })
          .finally(() => {
            commit('GET_LOAD_ORDER', false)
          })
      })
    },
    getAllStatus ({ commit }) {
      return new Promise((resolve, reject) => {
        axiosInit.get('/order-statuses')
          .then(res => {
            resolve()
            commit('GET_ALL_ORDER_STATUS', res.order_statuses)
            console.log(res)
          })
          .catch(error => {
            reject(error)
            this.$message.error(error.message)
          })
      })
    }
  }
}
