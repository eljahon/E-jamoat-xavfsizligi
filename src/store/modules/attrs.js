import axiosInit from '@/utils/axios_init'
export default {
  state: {
    attrs: [],
    loadAttr: false,
    paginationAttr: {},
    attrsByLang: {
      RU: [],
      UZ: [],
      EN: []
    }
  },
  getters: {
    attrRU: (state) => state.attrsByLang.RU,
    attrUZ: (state) => state.attrsByLang.UZ,
    attrEN: (state) => state.attrsByLang.EN,
    allAttrs: (state) => state.attrs,
    loadAttr: (state) => state.loadAttr,
    paginationAttr: (state) => state.paginationAttr
  },
  mutations: {
    GET_ALL_ATTRS(state, payload) {
      state.attrs = payload
    },
    GET_LOAD_ATTRS(state, payload) {
      state.loadAttr = payload
    },
    GET_ATTRS_PAGINATION(state, payload) {
      state.paginationAttr = payload
    },
    ATTR_RU(state, payload) {
      state.attrsByLang.RU = payload
    },
    ATTR_UZ(state, payload) {
      state.attrsByLang.UZ = payload
    },
    ATTR_EN(state, payload) {
      state.attrsByLang.EN = payload
    }
  },
  actions: {
    getAllAttrs({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let { pagination, search } = payload
        commit('GET_LOAD_ATTRS', true)
        // axios
        axiosInit.get('/product-properties', {
          limit: pagination.pageSize,
          offset: (pagination.current - 1) * pagination.pageSize,
          search: search
        })
          .then(res => {
            resolve()
            console.log(res)
            pagination.total = parseInt(res.count)
            commit('GET_ATTRS_PAGINATION', pagination)
            commit('GET_ALL_ATTRS', res.product_properties)
          })
          .catch(error => {
            reject(error)
            this.$message.error(error.message)
          })
          .finally(() => {
            commit('GET_LOAD_ATTRS', false)
          })
      })
    },
    getAttrBySlug({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.get(`/product-properties/${payload.slug}`, {
          lang: payload.lang
        }).then(res => {
          resolve(res)
          console.log(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    postAttr({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.post('/product-properties', payload).then(res => {
          resolve(res)
          console.log(res)
        })
          .catch(error => {
            reject(error)
          })
      })
    },
    updateAttr ({ commit }, payload) {
      if (payload.locker) {
        payload.data.active = !payload.data.active
      }
      return new Promise((resolve, reject) => {
        axiosInit.put(`/product-properties/${payload.id}`, payload.data)
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
    deleteAttr({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axiosInit.delete(`/product-properties/${payload}`)
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
    getAttrByLang({ commit }, lang) {
      return new Promise((resolve, reject) => {
        axiosInit.get('/product-properties', {
          limit: 100,
          offset: 0,
          lang: lang
        })
          .then(res => {
            if (lang === 'ru') commit('ATTR_RU', res.product_properties)
            if (lang === 'uz') commit('ATTR_UZ', res.product_properties)
            if (lang === 'en') commit('ATTR_EN', res.product_properties)
          })
      })
    }
  }
}
