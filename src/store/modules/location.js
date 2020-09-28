import axiosInit from '@/utils/axios_init'
export default {
  state: {
    locations: [],
    locationList: [],
    loadLocation: false,
    pagination: {}
  },
  getters: {
    allLocations: (state) => state.locations,
    allLocationList: (state) => state.locationList,
    loadLocation: (state) => state.loadLocation,
    paginationLocation: (state) => state.pagination
  },
  mutations: {
    GET_ALL_LOCATION(state, payload) {
      state.locations = payload
    },
    GET_ALL_LOCATION_LIST(state, payload) {
      state.locationList = payload
    },
    GET_LOAD_LOCATION(state, payload) {
      state.loadLocation = payload
    },
    GET_LOCATION_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllLocations({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let { pagination } = payload
        commit('GET_LOAD_LOCATION', true)
        // axios
        axiosInit.get('/admin/location',
          {
            page: pagination.current
          }
        )
          .then(res => {
            resolve()
            pagination.total = parseInt(res.links.total)
            commit('GET_LOCATION_PAGINATION', pagination)
            commit('GET_ALL_LOCATION', res.data)
          })
          .catch(error => {
            reject(error)
            this.$message.error(error.message)
          })
          .finally(() => {
            commit('GET_LOAD_LOCATION', false)
          })
      })
    },
    getAllLocationsList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        // axios
        axiosInit.get('/admin/location/list')
          .then(res => {
            resolve()
            commit('GET_ALL_LOCATION_LIST', res.data)
          })
          .catch(error => {
            reject(error)
            this.$message.error(error.message)
          })
      })
    },
    updateLocation({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.put(`/admin/location/${payload.id}`, payload.data)
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
    deleteLocation({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.delete(`/admin/location/${payload}`)
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
    postLocation({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post('/admin/location', payload).then(res => {
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
