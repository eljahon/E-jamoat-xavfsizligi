import axiosInit from '@/utils/axios_init'
import notification from 'ant-design-vue/lib/notification'
export default {
  state: {
    data: [],
    loading: false,
    pagination: {}
  },
  getters: {
    allProduct: (state) => state.data,
    loadProduct: (state) => state.loading,
    paginationProduct: (state) => state.pagination
  },
  mutations: {
    GET_ALL_PRODUCT(state, payload) {
      state.data = payload
    },
    GET_LOAD_PRODUCT(state, payload) {
      state.loading = payload
    },
    GET_PRODUCT_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllProduct({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let { pagination } = payload
        commit('GET_LOAD_PRODUCT', true)
        // axios
        axiosInit.get('/admin/products', {
          page: pagination.current,
          name: payload.search ? payload.search : undefined,
          category: payload.category ? payload.category : undefined,
          brand: payload.brand ? payload.brand : undefined,
          supplier: payload.supplier ? payload.supplier : undefined,
          measure: payload.measure ? payload.measure : undefined,
          status: payload.status ? payload.status : undefined,
        })
          .then(res => {
            resolve(res)
            console.log(res)
            let page = { ...pagination }
            page.total = parseInt(res.links.total)
            commit('GET_PRODUCT_PAGINATION', page)
            commit('GET_ALL_PRODUCT', res.data)
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
            commit('GET_LOAD_PRODUCT', false)
          })
      })
    },
    updateProduct ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.put(`/admin/products/${payload.id}`, payload.data)
          .then(res => {
            resolve(res)
            console.log(res)
          })
          .catch(err => {
            reject(err)
            notification.error({
              message: 'Ошибка сети или сервер не работает',
              description: 'Пожалуйста, проверьте свою сеть или обновить страницу' + '\n' + err.message,
              duration: 5
            })
          })
      })
    },
    deleteProduct({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.delete(`/admin/products/${payload}`)
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
    postProduct({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post(`/admin/products/${payload.id}`, payload.data).then(res => {
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
    postProductGroup({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post('/admin/product-groups', payload).then(res => {
          resolve(res.data.id)
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
    updateProductGroup({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.put(`/admin/product-groups/${payload.id}`, payload.data).then(res => {
          resolve(res.data.id)
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
    getProductGroupById({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.get(`/admin/product-groups/update/${payload}`).then(res => {
          resolve(res.data)
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
    getProductsById({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.get(`/admin/products/${payload}`).then(res => {
          resolve(res.data)
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
