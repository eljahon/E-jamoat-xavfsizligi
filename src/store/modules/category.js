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
        let { pagination } = payload
        commit('GET_LOAD_CATEGORY', true)
        // axios
        axiosInit.get('/admin/category',
          {
          page: pagination.current
        }
        )
          .then(res => {
            resolve()
            pagination.total = parseInt(res.links.total)
            commit('GET_CATEGORY_PAGINATION', pagination)
            commit('GET_ALL_CATEGORY', res.data)
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
      return new Promise((resolve, reject) => {
        axiosInit.put(`/admin/category/${payload.id}`, payload.data)
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
        axiosInit.delete(`/admin/category/${payload}`)
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
        axiosInit.post('/admin/category', payload).then(res => {
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
