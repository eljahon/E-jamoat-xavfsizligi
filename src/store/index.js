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
import stuff from '@/store/modules/stuff'
import widget from '@/store/modules/widget'
import coupons from '@/store/modules/coupons'
import _user from '@/store/modules/_user'
import notification from '@/store/modules/notification'
import complaint from '@/store/modules/complaint'
import searchHistory from '@/store/modules/search_history'
import roles from '@/store/modules/roles'
import supplierProduct from '@/store/modules/supplierProduct'
import productList from '@/store/modules/product_list'
import homeWidget from '@/store/modules/home-widget'
import banner from '@/store/modules/banner'
// import orderDelivered from '@/store/modules/order-delivered'
import dashboard from '@/store/modules/dashboard'

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
    banner,
    courier,
    coupons,
    complaitTypes,
    complaint,
    dashboard,
    deliveryType,
    productList,
    brands,
    location,
    homeWidget,
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
    supplierProduct,
    features,
    stuff,
    widget,
    _user,
    roles,
    notification,
    searchHistory,
    // orderDelivered
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
