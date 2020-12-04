// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/dashboard'),
        meta: { title: 'dashboard', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] }
        // children: [
        //   // {
        //   //   path: '/dashboard/analysis',
        //   //   name: 'Analysis',
        //   //   component: () => import('@/views/dashboard/Analysis'),
        //   //   meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: [ 'dashboard' ] }
        //   // }
        //   // {
        //   //   path: 'https://www.baidu.com/',
        //   //   name: 'Monitor',
        //   //   meta: { title: 'menu.dashboard.monitor', target: '_blank' }
        //   // }
        //   // {
        //   //   path: '/dashboard/workplace',
        //   //   name: 'Workplace',
        //   //   component: () => import('@/views/dashboard/Workplace'),
        //   //   meta: { title: 'menu.dashboard.workplace', keepAlive: true, permission: [ 'dashboard' ] }
        //   // }
        // ]
      },
      // article
      {
        path: '/article',
        name: 'article',
        hideChildrenInMenu: true,
        component: RouteView,
        redirect: '/article/list',
        meta: { title: 'article', icon: 'file', permission: [ 'form' ] },
        children: [
          {
            path: '/article/list',
            name: 'articleList',
            component: () => import('@/views/article/ArticleList'),
            meta: { title: 'article.list', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },
      // category
      {
        path: '/category/list',
        name: 'category',
        hideChildrenInMenu: true,
        component: RouteView,
        redirect: '/category/list',
        meta: { title: 'categories', icon: 'form', permission: [ 'form' ] },
        children: [
          {
            path: '/category/list',
            name: 'CategoryList',
            component: () => import('@/views/category/CategoryList'),
            meta: { title: 'categories', keepAlive: true, permission: [ 'form' ] }
          }
          // {
          //   path: '/category/product/:categoryId',
          //   name: 'CategoryProduct',
          //   component: () => import('@/views/products/ProductList'),
          //   meta: { title: 'products', keepAlive: true, permission: [ 'form' ] }
          // }
        ]
      },
      // order
      // {
      //   path: '/order',
      //   name: 'order',
      //   hideChildrenInMenu: true,
      //   component: RouteView,
      //   redirect: '/order/list',
      //   meta: { title: 'order', icon: 'shop', permission: [ 'form' ] },
      //   children: [
      //     {
      //       path: '/order/list',
      //       name: 'OrderList',
      //       component: () => import('@/views/order/orderList'),
      //       meta: { title: 'order_list', keepAlive: true, permission: [ 'form' ] }
      //     }
      //   ]
      // },
      // couriers
      {
        path: '/courier',
        name: 'courier',
        hideChildrenInMenu: true,
        component: RouteView,
        redirect: '/courier/list',
        meta: { title: 'couriers', icon: 'car', permission: [ 'form' ] },
        children: [
          {
            path: '/courier/list',
            name: 'CourierList',
            component: () => import('@/views/couriers/CourierList'),
            meta: { title: 'couriers.list', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },
      {
        path: '/features',
        name: 'features',
        hideChildrenInMenu: true,
        component: RouteView,
        redirect: '/features/list',
        meta: { title: 'features', icon: 'dropbox', permission: [ 'form' ] },
        children: [
          {
            path: '/features/list',
            name: 'FeaturesList',
            component: () => import('@/views/features/FeaturesList'),
            meta: { title: 'features.list', keepAlive: true, permission: [ 'form' ] }
          },
          {
            path: '/features/create',
            name: 'FeaturesCreate',
            component: () => import('@/views/features/FeaturesCreateWithUpdate'),
            meta: { title: 'features.create', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },
      {
        path: '/users',
        name: 'users',
        hideChildrenInMenu: true,
        component: RouteView,
        redirect: '/users/list',
        meta: { title: 'users', icon: 'user', permission: [ 'form' ] },
        children: [
          {
            path: '/users/list',
            name: 'UsersList',
            component: () => import('@/views/staff/StaffList'),
            meta: { title: 'users.list', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },
      // brands
      {
        path: '/brands',
        name: 'brands',
        hideChildrenInMenu: true,
        component: RouteView,
        redirect: '/brands/list',
        meta: { title: 'brands', icon: 'apple', permission: [ 'form' ] },
        children: [
          {
            path: '/brands/list',
            name: 'BrandList',
            component: () => import('@/views/brands/BrandsList'),
            meta: { title: 'brands.list', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },
      // complait types
      {
        path: '/complaintTypes',
        name: 'complaintTypes',
        hideChildrenInMenu: true,
        component: RouteView,
        redirect: '/complaintTypes/list',
        meta: { title: 'complaint_type', icon: 'sound', permission: [ 'form' ] },
        children: [
          {
            path: '/complaintTypes/list',
            name: 'complaintTypesList',
            component: () => import('@/views/complaint_type/ComplaintTypesList'),
            meta: { title: 'complaint_type.list', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },
      // deliveryTypes
      {
        path: '/deliveryTypes',
        name: 'deliveryTypes',
        hideChildrenInMenu: true,
        component: RouteView,
        redirect: '/deliveryTypes/list',
        meta: { title: 'delivery_type', icon: 'rocket', permission: [ 'form' ] },
        children: [
          {
            path: '/deliveryTypes/list',
            name: 'deliveryTypesList',
            component: () => import('@/views/delivery_type/DeliveryTypeList'),
            meta: { title: 'delivery_type.list', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },
      // location
      {
        path: '/location',
        name: 'location',
        hideChildrenInMenu: true,
        component: RouteView,
        redirect: '/location/list',
        meta: { title: 'location', icon: 'environment', permission: [ 'form' ] },
        children: [
          {
            path: '/location/list',
            name: 'locationList',
            component: () => import('@/views/location/LocationList'),
            meta: { title: 'location.list', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },
      // measure
      {
        path: '/measure',
        name: 'measure',
        hideChildrenInMenu: true,
        component: RouteView,
        redirect: '/measure/list',
        meta: { title: 'measures', icon: 'paper-clip', permission: [ 'form' ] },
        children: [
          {
            path: '/measure/list',
            name: 'measureList',
            component: () => import('@/views/measure/MeasureList'),
            meta: { title: 'measures.list', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },
      // vacancy
      {
        path: '/vacancy',
        name: 'vacancy',
        hideChildrenInMenu: true,
        component: RouteView,
        redirect: '/vacancy/list',
        meta: { title: 'vacancy', icon: 'contacts', permission: [ 'form' ] },
        children: [
          {
            path: '/vacancy/list',
            name: 'vacancyList',
            component: () => import('@/views/vacancy/VacancyList'),
            meta: { title: 'vacancy.list', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },
      // supplier
      {
        path: '/supplier_all',
        redirect: '/supplier_all/supplier',
        component: RouteView,
        meta: { title: 'supplier', icon: 'scan', permission: ['form'] },
        children: [
          {
            path: '/supplier_all/supplier',
            name: 'supplier',
            hideChildrenInMenu: true,
            component: RouteView,
            redirect: '/supplier/list',
            meta: { title: 'supplier', permission: [ 'form' ] },
            children: [
              {
                path: '/supplier/list',
                name: 'supplierList',
                component: () => import('@/views/supplier/SupplierList'),
                meta: { title: 'supplier.list', keepAlive: true, permission: [ 'form' ] }
              }
            ]
          },
          {
            path: '/supplier_all/supplierStore',
            name: 'supplierStore',
            hideChildrenInMenu: true,
            component: RouteView,
            redirect: '/supplierStore/list',
            meta: { title: 'supplier_store', permission: [ 'form' ] },
            children: [
              {
                path: '/supplierStore/list',
                name: 'supplierStoreList',
                component: () => import('@/views/supplierStore/SupplierStoreList'),
                meta: { title: 'supplier_store.list', keepAlive: true, permission: [ 'form' ] }
              }
            ]
          },
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
