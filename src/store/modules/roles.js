import axiosInit from '@/utils/axios_init'
import notification from 'ant-design-vue/es/notification'
export default {
  state: {
    permissions: []
    // data: [],
    // loading: false,
    // pagination: {}
  },
  getters: {
    allPermissions: (state) => state.permissions,
    // loadStuffs: (state) => state.loading,
    // paginationStuffs: (state) => state.pagination
  },
  mutations: {
    GET_ALL_PERMISSIONS (state, payload) {
      state.permissions = payload
    },
    // GET_LOAD_STUFFS(state, payload) {
    //   state.loading = payload
    // },
    // GET_STUFFS_PAGINATION(state, payload) {
    //   state.pagination = payload
    // }
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
  }
}
