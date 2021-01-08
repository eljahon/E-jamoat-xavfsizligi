import axiosInit from '@/utils/axios_init'
import notification from 'ant-design-vue/es/notification'
export default {
  state: {
    data: [],
    loading: false,
    pagination: {}
  },
  getters: {
    allStuffs: (state) => state.data,
    loadStuffs: (state) => state.loading,
    paginationStuffs: (state) => state.pagination
  },
  mutations: {
    GET_ALL_STUFFS(state, payload) {
      state.data = payload
    },
    GET_LOAD_STUFFS(state, payload) {
      state.loading = payload
    },
    GET_STUFFS_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllStuffs({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let { pagination } = payload
        commit('GET_LOAD_STUFFS', true)
        // axios
        axiosInit.get('/admin/stuff',
          {
            page: pagination.current
          }
        )
          .then(res => {
            resolve()
            pagination.total = parseInt(res.links.total)
            commit('GET_STUFFS_PAGINATION', pagination)
            commit('GET_ALL_STUFFS', res.data)
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
            commit('GET_LOAD_STUFFS', false)
          })
      })
    },
    updateStuffs({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.put(`/admin/stuff/${payload.id}`, payload.data)
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
    deleteStuffs({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.delete(`/admin/stuff/${payload}`)
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
    postStuffs({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post('/admin/stuff', payload).then(res => {
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
