import axiosInit from '@/utils/axios_init'
import notification from 'ant-design-vue/es/notification'
export default {
  state: {
    data: [],
    loading: false,
    pagination: {}
  },
  getters: {
    allNotification: (state) => state.data,
    loadNotifications: (state) => state.loading,
    paginationNotifications: (state) => state.pagination
  },
  mutations: {
    GET_ALL_NOTIFICATIONS(state, payload) {
      state.data = payload
    },
    GET_LOAD_NOTIFICATIONS(state, payload) {
      state.loading = payload
    },
    GET_NOTIFICATIONS_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllNotifications({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let { pagination } = payload
        commit('GET_LOAD_NOTIFICATIONS', true)
        // axios
        axiosInit.get('/admin/notifications',
          {
            page: pagination.current
          }
        )
          .then(res => {
            resolve()
            pagination.total = parseInt(res.links.total)
            commit('GET_NOTIFICATIONS_PAGINATION', pagination)
            commit('GET_ALL_NOTIFICATIONS', res.data)
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
            commit('GET_LOAD_NOTIFICATIONS', false)
          })
      })
    },
    updateNotifications({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post(`/admin/notifications/change/${payload.id}`, payload.data)
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
