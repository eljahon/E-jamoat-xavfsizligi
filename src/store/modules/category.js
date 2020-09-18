import axiosInit from '@/utils/axios_init'
export default {
  state: {
    categorys: [],
    loadCategory: false,
    pagination: {}
  },
  getters: {
    allCategory: (state) => state.categorys,
    loadCategory: (state) => state.loadCategory,
    paginationCategory: (state) => state.pagination
  },
  mutations: {
    GET_ALL_CATEGORY(state, payload) {
      state.categorys = payload
    },
    GET_LOAD_CATEGORY(state, payload) {
      state.loadCategory = payload
    },
    GET_CATEGORY_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllCategory({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let { pagination, search } = payload
        commit('GET_LOAD_CATEGORY', true)
        // axios
        axiosInit.get('/vendor-categories', {
          limit: pagination.pageSize,
          offset: (pagination.current - 1) * pagination.pageSize,
          search: search
        })
          .then(res => {
            resolve()
            pagination.total = parseInt(res.count)
            commit('GET_CATEGORY_PAGINATION', pagination)
            commit('GET_ALL_CATEGORY', res.vendor_categories)
          })
          .catch(error => {
            reject(error)
            this.$message.error(error.message)
          })
          .finally(() => {
            commit('GET_LOAD_CATEGORY', false)
          })
      })
    },
    updateCategory({ commit }, payload) {
      if (payload.locker) {
        payload.data.active = !payload.data.active
      }
      return new Promise((resolve, reject) => {
        axiosInit.put(`/vendor-categories/${payload.id}`, payload.data)
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
    deleteCategory({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.delete(`/vendor-categories/${payload}`)
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
    postCategory({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post('/vendor-categories', payload).then(res => {
          resolve(res)
          console.log(res)
        })
        .catch(error => {
          reject(error)
        })
      })
    },
    getCategoryBySlug({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.get(`/vendor-categories/${payload.slug}`, {
          lang: payload.lang
        }).then(res => {
          resolve(res)
          console.log(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
