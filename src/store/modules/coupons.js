import axiosInit from '@/utils/axios_init'
import notification from 'ant-design-vue/es/notification'
export default {
  state: {
    data: [],
    loading: false,
    pagination: {}
  },
  getters: {
    allCoupons: (state) => state.data,
    loadCoupons: (state) => state.loading,
    paginationCoupons: (state) => state.pagination
  },
  mutations: {
    GET_ALL_COUPONS(state, payload) {
      state.data = payload
    },
    GET_LOAD_COUPONS(state, payload) {
      state.loading = payload
    },
    GET_COUPONS_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllCoupons({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let { pagination } = payload
        commit('GET_LOAD_COUPONS', true)
        // axios
        axiosInit.get('/admin/coupon',
          {
            page: pagination.current
          }
        )
          .then(res => {
            resolve()
            pagination.total = parseInt(res.links.total)
            commit('GET_COUPONS_PAGINATION', pagination)
            commit('GET_ALL_COUPONS', res.data)
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
            commit('GET_LOAD_COUPONS', false)
          })
      })
    },
    updateCoupons({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.put(`/admin/coupon/${payload.id}`, payload.data)
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
    getCouponById({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.get(`/admin/coupon/${payload}`)
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
    deleteCoupons({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.delete(`/admin/coupon/${payload}`)
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
    postCoupons({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post('/admin/coupon', payload).then(res => {
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
