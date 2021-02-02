import axiosInit from '@/utils/axios_init'
import errorMessage from '@/utils/errorMessage'
export default {
  state: {
    supplierStores: [],
    // supplierStoresById: [],
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
    // GET_ALL_SUPPLIER_STORE_BY_ID(state, payload) {
    //   state.supplierStoresById = payload
    // },
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
        axiosInit.get(`/admin/supplier-store${ payload.id ? '/list/' + payload.id : '' }`,
          {
            page: !payload.id ? pagination.current : undefined
          }
        )
          .then(res => {
            console.log(res)
            resolve()
            pagination.total = payload.id ? res.data.length : parseInt(res.links.total)
            commit('GET_SUPPLIER_STORE_PAGINATION', pagination)
            commit('GET_ALL_SUPPLIER_STORE', res.data)
          })
          .catch(error => {
            reject(error)
            errorMessage(error)
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
            errorMessage(error)
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
            errorMessage(error)
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
            errorMessage(error)
          })
      })
    }
  }
}
