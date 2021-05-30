import axiosInit from '@/utils/axios_init'
import notification from 'ant-design-vue/es/notification'
export default {
  state: {
    data: [],
    loading: false,
    pagination: {},
    types: null,
  },
  getters: {
    allHomeWigets: (state) => state.data,
    loadHomeWigets: (state) => state.loading,
    homeWidgetTypes: (state) => state.types,
    paginationHomeWigets: (state) => state.pagination
  },
  mutations: {
    GET_ALL_HOME_WIDGETS(state, payload) {
      state.data = payload
    },
    GET_HOME_WIDGET_TYPES(state, payload) {
      state.types = payload
    },
    GET_LOAD_HOME_WIDGETS(state, payload) {
      state.loading = payload
    },
    GET_WIDGETS_HOME_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllHomeWidgets({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let { pagination } = payload
        commit('GET_LOAD_HOME_WIDGETS', true)
        // axios
        axiosInit.get('/admin/home-widgets',
          {
            page: pagination.current
          }
        )
          .then(res => {
            resolve()
            pagination.total = parseInt(res.links.total)
            commit('GET_WIDGETS_HOME_PAGINATION', pagination)
            commit('GET_ALL_HOME_WIDGETS', res.data)
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
            commit('GET_LOAD_HOME_WIDGETS', false)
          })
      })
    },
    getHomeWidgetTypes({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.get('/admin/home-widgets/types')
          .then(res => {
            console.log(res)
            commit('GET_HOME_WIDGET_TYPES', res.data)
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
    updateHomeWidgets({ commit }, payload) {
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
    getHomeWidgetById({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.get(`/admin/widget/${payload}`)
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
    deleteHomeWidgets({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.delete(`/admin/home-widgets/${payload}`)
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
    postHomeWidgets({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post('/admin/home-widgets', payload).then(res => {
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
