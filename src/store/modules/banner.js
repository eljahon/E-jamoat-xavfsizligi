import axiosInit from '@/utils/axios_init'
import { notification } from 'ant-design-vue'
export default {
  state: {
    banners: [],
    loading: false,
    pagination: {}
  },
  getters: {
    allBanners: (state) => state.banners,
    loadBanner: (state) => state.loading,
    paginationBanner: (state) => state.pagination
  },
  mutations: {
    GET_ALL_BANNER(state, payload) {
      state.banners = payload
    },
    GET_LOAD_BANNER(state, payload) {
      state.loading = payload
    },
    GET_BANNER_PAGINATION(state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    getAllBanners({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit('GET_LOAD_BANNER', true)
        axiosInit.get('/admin/banners',
          {
            page: payload?.page,
            name: payload?.search,
            status: payload?.status
          }
        )
          .then(res => {
            console.log(res)
            resolve()
            let page = {
              current: payload.page,
              pageSize: 15,
            }
            page.total = parseInt(res.links.total)
            commit('GET_BANNER_PAGINATION', page)
            commit('GET_ALL_BANNER', res.data)
          })
          .catch(error => {
            reject(error)
            // this.$message.error(error.message)
          })
          .finally(() => {
            commit('GET_LOAD_BANNER', false)
          })
      })
    },
    updateBanner({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post(`/admin/banners/${payload.id}`, payload.data)
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
    deleteBanner({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.delete(`/admin/banners/${payload}`)
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
    postBanner({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post('/admin/banners', payload).then(res => {
          resolve(res)
          console.log(res)
        })
          .catch(error => {
            reject(error)
            console.log(error.response)
            if (error.response.data.errors.file) {
              notification.error({
                message: 'Ошибка разрешения изображения'
              })
            } else {
              notification.error({
                message: 'Ошибка'
              })
            }
          })
      })
    },
    // getAllBannersList({ commit }, payload) {
    //   return new Promise((resolve, reject) => {
    //     commit('GET_LOAD_BANNER', true)
    //     // axios
    //     axiosInit.get('/admin/brand/list')
    //       .then(res => {
    //         console.log(res)
    //         resolve()
    //         commit('GET_ALL_BANNER', res.data)
    //       })
    //       .catch(error => {
    //         reject(error)
    //         this.$message.error(error.message)
    //       })
    //       .finally(() => {
    //         commit('GET_LOAD_BANNER', false)
    //       })
    //   })
    // },
  }
}
