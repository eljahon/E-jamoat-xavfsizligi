import axiosInit from '@/utils/axios_init'
import notification from 'ant-design-vue/lib/notification'
export default {
  state: {
    data: [],
    loading: false,
    pagination: {}
  },
  getters: {
    allProductList: (state) => state.data,
    loadProductList: (state) => state.loading,
    paginationProductList: (state) => state.pagination
  },
  mutations: {
    GET_ALL_PRODUCT_LIST(state, payload) {
      state.data = payload
    },
    GET_LOAD_PRODUCT_LIST(state, payload) {
      state.loading = payload
    },
    GET_PRODUCT_PAGINATION_LIST(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllProductList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        // let { pagination } = payload
        commit('GET_LOAD_PRODUCT_LIST', true)
        // axios
        axiosInit.get('/admin/products', {
          page: payload?.page,
          name: payload?.search,
          category: payload.category ? payload.category : undefined,
          brand: payload.brand ? payload.brand : undefined,
          supplier: payload.supplier ? payload.supplier : undefined,
          measure: payload.measure ? payload.measure : undefined,
          status: payload.status ? payload.status : undefined,
        })
          .then(res => {
            resolve(res)
            console.log(res)
            let page = {
              current: payload.page,
              pageSize: 15,
            }
            page.total = parseInt(res.links.total)
            commit('GET_PRODUCT_PAGINATION_LIST', page)
            commit('GET_ALL_PRODUCT_LIST', res.data)
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
            commit('GET_LOAD_PRODUCT_LIST', false)
          })
      })
    }
  }
}
