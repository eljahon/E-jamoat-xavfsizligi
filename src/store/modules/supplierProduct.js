import axiosInit from '@/utils/axios_init'
import errorMessage from '@/utils/errorMessage'
export default {
  state: {
    data: [],
    loading: false,
    pagination: {}
  },
  getters: {
    allSupplierProduct: (state) => state.data,
    loadSupplierProduct: (state) => state.loading,
    paginationSupplierProduct: (state) => state.pagination
  },
  mutations: {
    GET_ALL_SUPPLIER_PRODUCT(state, payload) {
      state.data = payload
    },
    GET_LOAD_SUPPLIER_PRODUCT(state, payload) {
      state.loading = payload
    },
    GET_SUPPLIER_PRODUCT_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllSupplierProduct({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let { pagination } = payload
        commit('GET_LOAD_SUPPLIER_PRODUCT', true)
        // axios
        axiosInit.get(`/admin/supplier-product${ payload.id ? '/products/' + payload.id : '' }`,
          {
            page: pagination.current
          }
        )
          .then(res => {
            console.log(res)
            resolve(res)
            pagination.total = parseInt(res.links.total)
            commit('GET_SUPPLIER_PRODUCT_PAGINATION', pagination)
            commit('GET_ALL_SUPPLIER_PRODUCT', res.data)
          })
          .catch(error => {
            reject(error)
            errorMessage(error)
          })
          .finally(() => {
            commit('GET_LOAD_SUPPLIER_PRODUCT', false)
          })
      })
    },
    updateSupplierProduct({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.put(`/admin/supplier-product/${payload.id}`, payload.data)
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
    deleteSupplierProduct({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.delete(`/admin/supplier-product/${payload}`)
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
    postSupplierProduct({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post('/admin/supplier-product', payload).then(res => {
          resolve(res)
          console.log(res)
        })
          .catch(error => {
            reject(error)
          })
      })
    },
    getSupplierIsNotProduct({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.get(`/admin/supplier-product/products-not-in-supplier/${payload.id}`, {
          name: payload.search
        }).then(res => {
          resolve(res)
          console.log(res)
        })
          .catch(error => {
            reject(error)
          })
      })
    },
    getProductVariants({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.get(`/admin/features/variant/${payload}`).then(res => {
          resolve(res)
          console.log(res)
        })
          .catch(error => {
            reject(error)
          })
      })
    },
    getSupplierProductWithId ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.get(`/admin/supplier-product/${payload}`).then(res => {
          resolve(res)
          console.log(res)
        })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
