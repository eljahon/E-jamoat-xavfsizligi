import axiosInit from '@/utils/axios_init'
export default {
  state: {
    measures: [],
    loadMeasure: false,
    pagination: {}
  },
  getters: {
    allMeasures: (state) => state.measures,
    loadMeasure: (state) => state.loadMeasure,
    paginationMeasure: (state) => state.pagination
  },
  mutations: {
    GET_ALL_MEASURE(state, payload) {
      state.measures = payload
    },
    GET_LOAD_MEASURE(state, payload) {
      state.loadMeasure = payload
    },
    GET_MEASURE_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllMeasures({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit('GET_LOAD_MEASURE', true)
        // axios
        axiosInit.get('/admin/measure')
          .then(res => {
            resolve()
            if (payload) {
              let { pagination } = payload
              pagination.total = parseInt(res.links.total)
              commit('GET_BRAND_PAGINATION', pagination)
            }
            commit('GET_ALL_MEASURE', res.data)
          })
          .catch(error => {
            reject(error)
            this.$message.error(error.message)
          })
          .finally(() => {
            commit('GET_LOAD_MEASURE', false)
          })
      })
    },
    updateMeasure({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.put(`/admin/measure/${payload.id}`, payload.data)
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
    deleteMeasure({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.delete(`/admin/measure/${payload}`)
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
    postMeasure({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post('/admin/measure', payload).then(res => {
          resolve(res)
          console.log(res)
        })
          .catch(error => {
            reject(error)
          })
      })
    },
    getAllMeasureList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.get(`/admin/measure/list`)
          .then(res => {
            resolve(res.data)
            console.log(res.data)
          })
          .catch(error => {
            reject(error)
            console.log(error.message)
          })
      })
    },
  }
}
