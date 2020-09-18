import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import category from './modules/category'
import product from './modules/product'
import order from './modules/order'
import attrs from '@/store/modules/attrs'

// default router permission control
import permission from './modules/permission'

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    attrs,
    user,
    category,
    product,
    order,
    permission
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
