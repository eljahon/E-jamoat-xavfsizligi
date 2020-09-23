import axiosInit from '@/utils/axios_init'
export default {
  state: {
    brands: [],
    loadBrand: false,
    pagination: {}
  },
  getters: {
    allBrands: (state) => state.brands,
    loadBrand: (state) => state.loadBrand,
    paginationBrand: (state) => state.pagination
  },
  mutations: {
    GET_ALL_BRAND(state, payload) {
      state.brands = payload
    },
    GET_LOAD_BRAND(state, payload) {
      state.loadBrand = payload
    },
    GET_BRAND_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllBrands({ commit }, payload) {
      return new Promise((resolve, reject) => {
        // let { pagination, search } = payload
        commit('GET_LOAD_BRAND', true)
        // axios
        axiosInit.get('/admin/brand'
          // {
          // limit: pagination.pageSize,
          // offset: (pagination.current - 1) * pagination.pageSize,
          // search: search
          // }
        )
          .then(res => {
            resolve()
            // pagination.total = parseInt(res.count)
            // commit('GET_CATEGORY_PAGINATION', pagination)
            commit('GET_ALL_BRAND', res.data)
          })
          .catch(error => {
            reject(error)
            this.$message.error(error.message)
          })
          .finally(() => {
            commit('GET_LOAD_BRAND', false)
          })
      })
    },
    updateBrand({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.put(`/admin/courier/${payload.id}`, payload.data)
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
    deleteBrand({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.delete(`/admin/brand/${payload}`)
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
    postBrand({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post('/admin/brand', payload).then(res => {
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
