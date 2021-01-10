import axiosInit from '@/utils/axios_init'
import notification from 'ant-design-vue/es/notification'
export default {
  state: {
    data: [],
    loading: false,
    pagination: {}
  },
  getters: {
    allSeHistory: (state) => state.data,
    loadSeHistory: (state) => state.loading,
    paginationSeHistory: (state) => state.pagination
  },
  mutations: {
    GET_ALL_SHISTORY(state, payload) {
      state.data = payload
    },
    GET_LOAD_SHISTORY(state, payload) {
      state.loading = payload
    },
    GET_SHISTORY_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllSeHistory({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let { pagination } = payload
        commit('GET_LOAD_SHISTORY', true)
        // axios
        axiosInit.get('/admin/search-history',
          {
            page: pagination.current,
            from: payload.from,
            to: payload.to
          }
        )
          .then(res => {
            resolve()
            pagination.total = parseInt(res.links.total)
            commit('GET_SHISTORY_PAGINATION', pagination)
            commit('GET_ALL_SHISTORY', res.data)
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
            commit('GET_LOAD_SHISTORY', false)
          })
      })
    },
    updateSeHistory({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post(`/admin/complaints/change/${payload.id}`, payload.data)
          .then(res => {
            resolve(res)
            console.log(res)
          })
          .catch(err => {
            notification.error({
              message: 'Ошибка сети или сервер не работает',
              description: 'Пожалуйста, проверьте свою сеть или обновить страницу' + '\n' + err.message,
              duration: 5
            })
            reject(err)
          })
      })
    }
  }
}
