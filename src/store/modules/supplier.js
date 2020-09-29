import axiosInit from '@/utils/axios_init'
export default {
  state: {
    suppliers: [],
    suppliersList: [],
    loadSupplier: false,
    pagination: {}
  },
  getters: {
    allSuppliers: (state) => state.suppliers,
    allSuppliersList: (state) => state.suppliersList,
    loadSupplier: (state) => state.loadSupplier,
    paginationSupplier: (state) => state.pagination
  },
  mutations: {
    GET_ALL_SUPPLIER(state, payload) {
      state.suppliers = payload
    },
    GET_ALL_SUPPLIER_LIST(state, payload) {
      state.suppliersList = payload
    },
    GET_LOAD_SUPPLIER(state, payload) {
      state.loadSupplier = payload
    },
    GET_SUPPLIER_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllSuppliers({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let { pagination } = payload
        commit('GET_LOAD_SUPPLIER', true)
        // axios
        axiosInit.get('/admin/supplier',
          {
            page: pagination.current
          }
        )
          .then(res => {
            resolve()
            pagination.total = parseInt(res.links.total)
            commit('GET_SUPPLIER_PAGINATION', pagination)
            commit('GET_ALL_SUPPLIER', res.data)
          })
          .catch(error => {
            reject(error)
            this.$message.error(error.message)
          })
          .finally(() => {
            commit('GET_LOAD_SUPPLIER', false)
          })
      })
    },
    updateSupplier({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.put(`/admin/supplier/${payload.id}`, payload.data)
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
    deleteSupplier({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.delete(`/admin/supplier/${payload}`)
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
    postSupplier({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post('/admin/supplier', payload).then(res => {
          resolve(res)
          console.log(res)
        })
          .catch(error => {
            reject(error)
          })
      })
    },
    getAllSuppliersList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        // axios
        axiosInit.get('/admin/supplier')
          .then(res => {
            resolve()
            commit('GET_ALL_SUPPLIER_LIST', res.data)
          })
          .catch(error => {
            reject(error)
            this.$message.error(error.message)
          })
      })
    },
  }
}
