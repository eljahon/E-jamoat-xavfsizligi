import axiosInit from '@/utils/axios_init'
export default {
  state: {
    supplierStores: [],
    supplierStoresById: [],
    loadSupplierStore: false,
    pagination: {}
  },
  getters: {
    allSupplierStores: (state) => state.supplierStores,
    loadSupplierStore: (state) => state.loadSupplierStore,
    paginationSupplierStore: (state) => state.pagination
  },
  mutations: {
    GET_ALL_SUPPLIER_STORE(state, payload) {
      state.supplierStores = payload
    },
    GET_ALL_SUPPLIER_STORE_BY_ID(state, payload) {
      state.supplierStoresById = payload
    },
    GET_LOAD_SUPPLIER_STORE(state, payload) {
      state.loadSupplierStore = payload
    },
    GET_SUPPLIER_STORE_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllSupplierStores({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let { pagination } = payload
        commit('GET_LOAD_SUPPLIER_STORE', true)
        // axios
        axiosInit.get('/admin/supplier-store',
          {
            page: pagination.current
          }
        )
          .then(res => {
            resolve()
            pagination.total = parseInt(res.links.total)
            commit('GET_SUPPLIER_STORE_PAGINATION', pagination)
            commit('GET_ALL_SUPPLIER_STORE', res.data)
          })
          .catch(error => {
            reject(error)
            this.$message.error(error.message)
          })
          .finally(() => {
            commit('GET_LOAD_SUPPLIER_STORE', false)
          })
      })
    },
    updateSupplierStore({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.put(`/admin/supplier-store/${payload.id}`, payload.data)
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
    getByIdSupplierStore({ commit }, id) {
      return new Promise((resolve, reject) => {
        axiosInit.get(`/admin/supplier-store/${id}`)
          .then(res => {
            commit('GET_ALL_SUPPLIER_STORE_BY_ID', res.data)
            resolve(res)
            console.log(res)
          })
          .catch(error => {
            reject(error)
            console.log(error.message)
          })
      })
    },
    deleteSupplierStore({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.delete(`/admin/supplier-store/${payload}`)
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
    postSupplierStore({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post('/admin/supplier-store', payload).then(res => {
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
