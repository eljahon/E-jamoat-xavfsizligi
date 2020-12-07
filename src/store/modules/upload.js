// import axiosInit from '@/utils/axios_init'
import axios from 'axios'
export default {
  state: {
    progress: 0,
    onload: false
  },
  getters: {
    progress: state => state.progress,
    onUpload: state => state.onload
  },
  mutations: {
    CHANGE_STATUS(state, payload) {
      state.progress = payload
    },
    ON_LOAD(state, payload) {
      state.onload = payload
    }
  },
  actions: {
    uploadData ({ commit }, payload) {
      commit('CHANGE_STATUS', 0)
      commit('ON_LOAD', true)
      return new Promise((resolve, reject) => {
        axios.post('http://163.172.182.95:2500/api/v1/admin/category/upload', payload, {
          onUploadProgress: e => {
            let progress = Math.floor((e.loaded * 100) / e.total)
            commit('CHANGE_STATUS', progress)
          }
        }).then(res => {
          console.log(res)
          resolve(res)
        })
          .catch(err => {
            console.log(err)
            reject(err)
          }).finally(() => {
            commit('ON_LOAD', false)
        })
      })
    }
  }
}
