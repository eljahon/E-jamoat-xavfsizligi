import axiosInit from '@/utils/axios_init'
export default {
  state: {
    vacancys: [],
    loadVacancy: false,
    pagination: {}
  },
  getters: {
    allVacancys: (state) => state.vacancys,
    loadVacancy: (state) => state.loadVacancy,
    paginationVacancy: (state) => state.pagination
  },
  mutations: {
    GET_ALL_VACANCY(state, payload) {
      state.vacancys = payload
    },
    GET_LOAD_VACANCY(state, payload) {
      state.loadVacancy = payload
    },
    GET_VACANCY_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllVacancys({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let { pagination } = payload
        commit('GET_LOAD_VACANCY', true)
        // axios
        axiosInit.get('/admin/vacancy',
          {
            page: pagination.current
          }
        )
          .then(res => {
            resolve()
            pagination.total = parseInt(res.links.total)
            commit('GET_VACANCY_PAGINATION', pagination)
            commit('GET_ALL_VACANCY', res.data)
          })
          .catch(error => {
            reject(error)
            this.$message.error(error.message)
          })
          .finally(() => {
            commit('GET_LOAD_VACANCY', false)
          })
      })
    },
    updateVacancy({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.put(`/admin/vacancy/${payload.id}`, payload.data)
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
    deleteVacancy({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.delete(`/admin/vacancy/${payload}`)
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
    postVacancy({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post('/admin/vacancy', payload).then(res => {
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
