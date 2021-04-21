// import axiosInit from '@/utils/axios_init'
import axios from 'axios'
import axiosInit from '@/utils/axios_init'
import errorMessage from '@/utils/errorMessage'
export default {
  state: {
    progress: 0,
    onload: false,
    attachments: [],
    attachments_loading: false,
    filemanager: {
      folders: [],
      files: [],
      loading: false
    }
  },
  getters: {
    progress: state => state.progress,
    onUpload: state => state.onload,
    fileManager: state => state.filemanager,
    attachments: state => state.attachments,
    attachments_loading: state => state.attachments_loading
  },
  mutations: {
    CHANGE_STATUS(state, payload) {
      state.progress = payload
    },
    ON_LOAD(state, payload) {
      state.onload = payload
    },
    SET_FOLDERS (state, payload) {
      state.filemanager.folders = payload
    },
    SET_FILES (state, payload) {
      state.filemanager.files = payload
    },
    ON_LOAD_ATTACHMENTS (state, payload) {
      state.attachments_loading = payload
    },
    ON_LOAD_FILEMANAGER (state, payload) {
      state.filemanager.loading = payload
    },
    ATTACHMENTS (state, payload) {
      state.attachments = payload
    },
  },
  actions: {
    uploadData ({ commit }, payload) {
      commit('CHANGE_STATUS', 0)
      commit('ON_LOAD', true)
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_API_BASE_URL}/admin/category/upload`, payload, {
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
    },
    getFileManager ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit('ON_LOAD_FILEMANAGER', true)
        axiosInit.get('/admin/file-manager', {
          folder: payload
        })
          .then(res => {
            commit('SET_FOLDERS', res.data.directories)
            commit('SET_FILES', res.data.files)
            resolve()
            console.log(res)
          })
          .catch(error => {
            reject(error)
            errorMessage(error)
          })
          .finally(() => {
            commit('ON_LOAD_FILEMANAGER', false)
          })
      })
    },
    getAttachments ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit('ON_LOAD_ATTACHMENTS', true)
        axiosInit.get(`/admin/products/attachment-list/${payload}`)
          .then(res => {
            commit('ATTACHMENTS', res.data)
            resolve()
            console.log(res)
          })
          .catch(error => {
            reject(error)
            errorMessage(error)
          })
          .finally(() => {
            commit('ON_LOAD_ATTACHMENTS', false)
          })
      })
    },
  }
}
