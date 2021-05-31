import axiosInit from '@/utils/axios_init'
export default {
  state: {
    locations: [],
    parent_location: [],
    locationList: [],
    tree_location: [],
    loadLocation: false,
    pagination: {}
  },
  getters: {
    allLocations: (state) => state.locations,
    allLocationList: (state) => state.locationList,
    loadLocation: (state) => state.loadLocation,
    paginationLocation: (state) => state.pagination,
    parentLocation: (state) => state.parent_location,
    treeLocation: (state) => state.tree_location
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
    },
    GET_PARENT_LOCATION(state, payload) {
      state.parent_location = payload
    },
    GET_TREE_LOCATION(state, payload) {
      state.tree_location = payload
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
            page: pagination.current,
            name: payload?.search
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
    getAllTreeLocationsList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        // axios
        axiosInit.get('/admin/location/parent-with-child')
          .then(res => {
            resolve()
            commit('GET_TREE_LOCATION', res.data)
          })
          .catch(error => {
            reject(error)
            this.$message.error(error.message)
          })
      })
    },
    getParentLocationsList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        // axios
        axiosInit.get('/admin/location/parent')
          .then(res => {
            resolve()
            commit('GET_PARENT_LOCATION', res.data)
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
