import axiosInit from '@/utils/axios_init'
import notification from 'ant-design-vue/es/notification'
export default {
  state: {
    permissions: [],
    roles: [],
    loading: false,
    pagination: {}
  },
  getters: {
    allPermissions: (state) => state.permissions,
    allRoles: (state) => state.roles,
    loadRole: (state) => state.loading,
    paginationRole: (state) => state.pagination
  },
  mutations: {
    GET_ALL_PERMISSIONS (state, payload) { state.permissions = payload },
    GET_ALL_ROLES (state, payload) { state.roles = payload },
    GET_ALL_ROLES_LOAD (state, payload) { state.loading = payload },
    GET_ALL_ROLES_PAGINATION (state, payload) { state.pagination = payload }
  },
  actions: {
    getAllPermissions({ commit }, payload) {
      return new Promise((resolve, reject) => {
        // axios
        axiosInit.get('admin/role/permissions')
          .then(res => {
            resolve()
            commit('GET_ALL_PERMISSIONS', res.data)
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
    getRoleById({ commit }, payload) {
      return new Promise((resolve, reject) => {
        // axios
        axiosInit.get(`admin/role/${payload}`)
          .then(res => {
            resolve(res)
            // commit('GET_ALL_PERMISSIONS', res.data)
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
    getAllRole({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let { pagination } = payload
        commit('GET_ALL_ROLES_LOAD', true)
        // axios
        axiosInit.get('/admin/role', {
          page: pagination.current
        })
          .then(res => {
            resolve(res)
            console.log(res)
            let page = { ...pagination }
            page.total = parseInt(res.count)
            commit('GET_ALL_ROLES_PAGINATION', page)
            commit('GET_ALL_ROLES', res.data)
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
            commit('GET_ALL_ROLES_LOAD', false)
          })
      })
    },
    saveRole({ commit }, payload) {
      return new Promise((resolve, reject) => {
        // axios
        axiosInit.post(`admin/role`, payload)
          .then(res => {
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
    },
    updateRole({ commit }, payload) {
      return new Promise((resolve, reject) => {
        // axios
        axiosInit.put(`admin/role/${payload.id}`, payload.data)
          .then(res => {
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
    },
    deleteRole({ commit }, payload) {
      return new Promise((resolve, reject) => {
        // axios
        axiosInit.delete(`admin/role/${payload}`)
          .then(res => {
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
