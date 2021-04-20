import axiosInit from '@/utils/axios_init'
import notification from 'ant-design-vue/es/notification'
export default {
  state: {
    data: [],
    categoryFeatures: [],
    mainFeatures: [],
    loading: false,
    pagination: {}
  },
  getters: {
    allFeatures: (state) => state.data,
    loadFeatures: (state) => state.loading,
    paginationFeatures: (state) => state.pagination,
    categoryFeatures: (state) => state.categoryFeatures,
    mainFeatures: (state) => state.mainFeatures
  },
  mutations: {
    GET_ALL_FEATURES(state, payload) {
      state.data = payload
    },
    GET_LOAD_FEATURES(state, payload) {
      state.loading = payload
    },
    GET_FEATURES_PAGINATION(state, payload) {
      state.pagination = payload
    },
    GET_CATEGORY_FEATURES(state, payload) {
      state.categoryFeatures = payload
    },
    GET_MAIN_CATEGORY_FEATURES(state, payload) {
      state.mainFeatures = payload
    }
  },
  actions: {
    getAllFeatures({ commit }, payload) {
      return new Promise((resolve, reject) => {
        // let { pagination } = payload
        commit('GET_LOAD_FEATURES', true)
        // axios
        axiosInit.get('/admin/features',
          {
            page: payload.page,
            name: payload.search ? payload.search : undefined,
            status: payload.status,
            type: payload.type ? payload.type : undefined,
            filter_type: payload.filter_type ? payload.filter_type : undefined,
            category: payload.category ? payload.category : undefined
          }
        )
          .then(res => {
            resolve(res.data)
            console.log(res)
            let pagination = {
              current: payload.page || 1,
              pageSize: 15,
              total: 0
            }
            pagination.total = parseInt(res.links.total)
            commit('GET_FEATURES_PAGINATION', pagination)
            commit('GET_ALL_FEATURES', res.data)
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
            commit('GET_LOAD_FEATURES', false)
          })
      })
    },
    getCategoryFeatures({ commit }, payload) {
      return new Promise((resolve, reject) => {
        // axios
        axiosInit.get(`/admin/features/simple/${payload}`,)
          .then(res => {
            console.log(res)
            resolve(res)
            commit('GET_CATEGORY_FEATURES', res.data)
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
    getMainFeatures({ commit }, payload) {
      return new Promise((resolve, reject) => {
        // axios
        axiosInit.get(`/admin/features/main/${payload}`,)
          .then(res => {
            console.log(res)
            resolve(res)
            commit('GET_MAIN_CATEGORY_FEATURES', res.data)
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
    updateFeatures({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.put(`/admin/features/${payload.id}`, payload.data)
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
    deleteFeatures({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.delete(`/admin/features/${payload}`)
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
    postFeatures({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post('/admin/features', payload).then(res => {
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
    getFeaturesById({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.get(`/admin/features/${payload}`).then(res => {
          resolve(res)
          console.log(res)
        }).catch(err => {
          notification.error({
            message: 'Ошибка сети или сервер не работает',
            description: 'Пожалуйста, проверьте свою сеть или обновить страницу' + '\n' + err.message,
            duration: 5
          })
          reject(err)
        })
      })
    },
    getParentFeatures({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.get(`/admin/features/parents`).then(res => {
          resolve(res)
          console.log(res)
        }).catch(err => {
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
