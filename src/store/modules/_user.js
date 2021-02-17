import axiosInit from '@/utils/axios_init'
import notification from 'ant-design-vue/es/notification'
export default {
  state: {
    data: [],
    loading: false,
    pagination: {}
  },
  getters: {
    allUsers: (state) => state.data,
    loadUsers: (state) => state.loading,
    paginationUsers: (state) => state.pagination
  },
  mutations: {
    GET_ALL_USERS(state, payload) {
      state.data = payload
    },
    GET_LOAD_USERS(state, payload) {
      state.loading = payload
    },
    GET_USERS_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllUsers({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let { pagination } = payload
        commit('GET_LOAD_USERS', true)
        // axios
        axiosInit.get('/admin/user',
          {
            page: pagination.current
          }
        )
          .then(res => {
            resolve()
            pagination.total = parseInt(res.links.total)
            commit('GET_USERS_PAGINATION', pagination)
            commit('GET_ALL_USERS', res.data)
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
            commit('GET_LOAD_USERS', false)
          })
      })
    },
    updateUsers({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.put(`/admin/user/${payload.id}`, payload.data)
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
    deleteUsers({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.delete(`/admin/user/${payload}`)
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
    postUsers({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post('/admin/user', payload).then(res => {
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
    getUserById ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.get(`/admin/user/${payload}`).then(res => {
          resolve(res)
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
