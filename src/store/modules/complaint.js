import axiosInit from '@/utils/axios_init'
import notification from 'ant-design-vue/es/notification'
export default {
  state: {
    data: [],
    loading: false,
    pagination: {}
  },
  getters: {
    allComplaint: (state) => state.data,
    loadComplaints: (state) => state.loading,
    paginationComplaints: (state) => state.pagination
  },
  mutations: {
    GET_ALL_COMPLAINTS(state, payload) {
      state.data = payload
    },
    GET_LOAD_COMPLAINTS(state, payload) {
      state.loading = payload
    },
    GET_COMPLAINTS_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllComplaints({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let { pagination } = payload
        commit('GET_LOAD_COMPLAINTS', true)
        // axios
        axiosInit.get('/admin/complaints',
          {
            page: pagination.current
          }
        )
          .then(res => {
            resolve()
            pagination.total = parseInt(res.links.total)
            commit('GET_COMPLAINTS_PAGINATION', pagination)
            commit('GET_ALL_COMPLAINTS', res.data)
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
            commit('GET_LOAD_COMPLAINTS', false)
          })
      })
    },
    updateComplaints({ commit }, payload) {
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
