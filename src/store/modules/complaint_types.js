import axiosInit from '@/utils/axios_init'
export default {
  state: {
    complaintTypes: [],
    loadComplaintTypes: false,
    pagination: {}
  },
  getters: {
    allComplaintTypes: (state) => state.complaintTypes,
    loadComplaintTypes: (state) => state.loadComplaintTypes,
    paginationComplaintTypes: (state) => state.pagination
  },
  mutations: {
    GET_ALL_COMPLAINT_TYPES(state, payload) {
      state.complaintTypes = payload
    },
    GET_LOAD_COMPLAINT_TYPES(state, payload) {
      state.loadcomplaintTypes = payload
    },
    GET_COMPLAINT_TYPES_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllComplaintTypes({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let { pagination } = payload
        commit('GET_LOAD_COMPLAINT_TYPES', true)
        // axios
        axiosInit.get('/admin/complaint-types',
          {
          page: pagination.current
          }
        )
          .then(res => {
            resolve()
            pagination.total = parseInt(res.links.total)
            commit('GET_COMPLAINT_TYPES_PAGINATION', pagination)
            commit('GET_ALL_COMPLAINT_TYPES', res.data)
          })
          .catch(error => {
            reject(error)
            this.$message.error(error.message)
          })
          .finally(() => {
            commit('GET_LOAD_COMPLAINT_TYPES', false)
          })
      })
    },
    updateComplaintTypes({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.put(`/admin/complaint-types/${payload.id}`, payload.data)
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
    deleteComplaintTypes({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.delete(`/admin/complaint-types/${payload}`)
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
    postComplaintTypes({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post('/admin/complaint-types', payload).then(res => {
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
