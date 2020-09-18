import axiosInit from '@/utils/axios_init'
export default {
  state: {
    products: [],
    loadProduct: false,
    pagination: {}
  },
  getters: {
    allProduct: (state) => state.products,
    loadProduct: (state) => state.loadProduct,
    paginationProduct: (state) => state.pagination
  },
  mutations: {
    GET_ALL_PRODUCT(state, payload) {
      state.products = payload
    },
    GET_LOAD_PRODUCT(state, payload) {
      state.loadProduct = payload
    },
    GET_PRODUCT_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllProduct({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let { pagination, search, categoryId } = payload
        commit('GET_LOAD_PRODUCT', true)
        // axios
        axiosInit.get('/products', {
          limit: pagination.pageSize,
          offset: (pagination.current - 1) * pagination.pageSize,
          search: search,
          vendor_category: categoryId
        })
          .then(res => {
            resolve()
            console.log(res)
            pagination.total = parseInt(res.count)
            commit('GET_PRODUCT_PAGINATION', pagination)
            commit('GET_ALL_PRODUCT', res.products)
          })
          .catch(error => {
            reject(error)
            this.$message.error(error.message)
          })
          .finally(() => {
            commit('GET_LOAD_PRODUCT', false)
          })
      })
    },
    updateProduct ({ commit }, payload) {
      if (payload.locker) {
        payload.data.active = !payload.data.active
      }
      return new Promise((resolve, reject) => {
        axiosInit.put(`/products/${payload.id}`, payload.data)
          .then(res => {
            resolve(res)
            console.log(res)
          })
          .catch(error => {
            reject(error)
            console.log(error.message)
          })
      })  
    },
    deleteProduct({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.delete(`/products/${payload}`)
          .then(res => {
            resolve()
            console.log(res)
          })
          .catch(error => {
            reject(error)
            console.log(error.message)
          })
      }) 
    },
    postProduct({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post('/products', payload).then(res => {
          resolve(res)
          console.log(res)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    getProductBySlug({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.get(`/products/${payload.slug}`, {
          lang: payload.lang
        }).then(res => {
          resolve(res)
          console.log(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    updateProductAttr ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.put(`/products/${payload.id}/update-property`, payload.data)
          .then(res => {
            resolve(res)
            console.log(res)
          })
          .catch(error => {
            reject(error)
            console.log(error.message)
          })
      })
    },
  }
}
