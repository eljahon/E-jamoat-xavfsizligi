import axiosInit from '@/utils/axios_init'
export default {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    uploadData ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post('/admin/category/upload', payload).then(res => {
          console.log(res)
          resolve(res)
        })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    }
  }
}
