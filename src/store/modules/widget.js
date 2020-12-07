import axiosInit from '@/utils/axios_init'
import notification from 'ant-design-vue/es/notification'
export default {
  state: {
    data: [],
    loading: false,
    pagination: {}
  },
  getters: {
    allWigets: (state) => state.data,
    loadWigets: (state) => state.loading,
    paginationWigets: (state) => state.pagination
  },
  mutations: {
    GET_ALL_WIDGETS(state, payload) {
      state.data = payload
    },
    GET_LOAD_WIDGETS(state, payload) {
      state.loading = payload
    },
    GET_WIDGETS_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllWidgets({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let { pagination } = payload
        commit('GET_LOAD_WIDGETS', true)
        // axios
        axiosInit.get('/admin/widget',
          {
            page: pagination.current
          }
        )
          .then(res => {
            resolve()
            pagination.total = parseInt(res.links.total)
            commit('GET_WIDGETS_PAGINATION', pagination)
            commit('GET_ALL_WIDGETS', res.data)
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
            commit('GET_LOAD_WIDGETS', false)
          })
      })
    },
    updateWidgets({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.put(`/admin/widget/${payload.id}`, payload.data)
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
    },
    deleteWidgets({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.delete(`/admin/widget/${payload}`)
          .then(res => {
            resolve()
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
    },
    postWidgets({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post('/admin/widget', payload).then(res => {
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
