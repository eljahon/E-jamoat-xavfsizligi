import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import category from './modules/category'
import product from './modules/product'
import order from './modules/order'
import attrs from '@/store/modules/attrs'
import courier from './modules/courier'
import brands from './modules/brands'
import complaitTypes from './modules/complaint_types'
import deliveryType from './modules/delivery_type'
import location from './modules/location'
import measure from './modules/measure'
import vacancy from './modules/vacancy'
import upload from './modules/upload'
import supplier from './modules/supplier'
import supplierStore from './modules/supplierStore'
import article from './modules/article'
import features from '@/store/modules/features'
import staff from '@/store/modules/staff'
import widget from '@/store/modules/widget'
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
    article,
    courier,
    complaitTypes,
    deliveryType,
    brands,
    location,
    user,
    category,
    product,
    order,
    permission,
    measure,
    vacancy,
    upload,
    supplier,
    supplierStore,
    features,
    staff,
    widget
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
