import axiosInit from '@/utils/axios_init'
import notification from 'ant-design-vue/es/notification'
export default {
  state: {
    data: [],
    loading: false,
    pagination: {}
  },
  getters: {
    allOrderDelivereds: (state) => state.data,
    loadOrderDelivereds: (state) => state.loading,
    paginationOrderDelivereds: (state) => state.pagination
  },
  mutations: {
    GET_ALL_ORDER_DELIVEREDS(state, payload) {
      state.data = payload
    },
    GET_LOAD_ORDER_DELIVEREDS(state, payload) {
      state.loading = payload
    },
    GET_ORDER_DELIVEREDS_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllOrderDelivered({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let { pagination } = payload
        commit('GET_LOAD_ORDER_DELIVEREDS', true)
        // axios
        axiosInit.get('/admin/orders/delivered',
          {
            page: pagination.current
          }
        )
          .then(res => {
            console.log(res)
            resolve()
            pagination.total = parseInt(res.links.total)
            commit('GET_ORDER_DELIVEREDS_PAGINATION', pagination)
            commit('GET_ALL_ORDER_DELIVEREDS', res.data)
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
            commit('GET_LOAD_ORDER_DELIVEREDS', false)
          })
      })
    }
  }
}
