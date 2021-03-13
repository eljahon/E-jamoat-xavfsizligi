import axiosInit from '@/utils/axios_init'
import notification from 'ant-design-vue/lib/notification'
export default {
  state: {
    data: [],
    loading: false,
    // loadingById: false,
    status: [],
    pagination: {}
  },
  getters: {
    allOrder: (state) => state.data,
    orderStatus: (state) => state.status,
    loadOrder: (state) => state.loading,
    paginationOrder: (state) => state.pagination
  },
  mutations: {
    GET_ALL_ORDER(state, payload) {
      state.data = payload
    },
    GET_ALL_ORDER_STATUS(state, payload) {
      state.status = payload
    },
    GET_LOAD_ORDER(state, payload) {
      state.loading = payload
    },
    GET_ORDER_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllOrder({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let { pagination } = payload
        commit('GET_LOAD_ORDER', true)
        // axios
        axiosInit.get(`/admin/orders${payload.type === 'main' ? '' : '/' + payload.type}`,
          {
            page: pagination.current,
            status: payload.status ? payload.status : undefined,
            username: payload.username ? payload.username : undefined,
            uuid: payload.uuid ? payload.uuid : undefined,
            delivery_type: payload.delivery_type ? payload.delivery_type : undefined
          }
        )
          .then(res => {
            console.log(res)
            resolve()
            pagination.total = parseInt(res.links.total)
            commit('GET_ORDER_PAGINATION', pagination)
            commit('GET_ALL_ORDER', res.data)
          })
          .catch(err => {
            notification.error({
              message: 'Ошибка сети или сервер не работает',
              description: 'Пожалуйста, проверьте свою сеть или обновить страницу' + '\n' + err.message,
              duration: 5
            })
            reject(err)
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
