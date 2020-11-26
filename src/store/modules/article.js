import axiosInit from '@/utils/axios_init'
export default {
  state: {
    articles: [],
    loadArticle: false,
    pagination: {}
  },
  getters: {
    allArticles: (state) => state.articles,
    loadArticle: (state) => state.loadArticle,
    paginationArticle: (state) => state.pagination
  },
  mutations: {
    GET_ALL_ARTICLE(state, payload) {
      state.articles = payload
    },
    GET_LOAD_ARTICLE(state, payload) {
      state.loadArticle = payload
    },
    GET_ARTICLE_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllArticles({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let { pagination } = payload
        commit('GET_LOAD_ARTICLE', true)
        // axios
        axiosInit.get('/admin/article',
          {
            page: pagination.current
          }
        )
          .then(res => {
            resolve()
            pagination.total = parseInt(res.links.total)
            commit('GET_ARTICLE_PAGINATION', pagination)
            commit('GET_ALL_ARTICLE', res.data)
          })
          .catch(error => {
            reject(error)
            this.$message.error(error.message)
          })
          .finally(() => {
            commit('GET_LOAD_ARTICLE', false)
          })
      })
    },
    updateArticle({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.put(`/admin/article/${payload.id}`, payload.data)
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
    deleteArticle({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.delete(`/admin/article/${payload}`)
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
    postArticle({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post('/admin/article', payload).then(res => {
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
